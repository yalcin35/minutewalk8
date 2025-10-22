<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import { user, isLoading } from '$lib/supabase';
  import { Calendar, Clock, Shield, BadgeCheck, DollarSign, Truck, Users, Leaf, Plus } from 'lucide-svelte';
  import DailyEventsModal from '$lib/components/DailyEventsModal.svelte';

  export let siteId: string | null = null;
  export let departmentId: string | null = null;
  export let month: Date = new Date();

  // SQCDPE+ categories with their colors
  const categories = [
    { id: 'safety', label: 'Safety', icon: Shield, color: 'red' },
    { id: 'quality', label: 'Quality', icon: BadgeCheck, color: 'blue' },
    { id: 'cost', label: 'Cost', icon: DollarSign, color: 'yellow' },
    { id: 'delivery', label: 'Delivery', icon: Truck, color: 'green' },
    { id: 'people', label: 'People', icon: Users, color: 'purple' },
    { id: 'environment', label: 'Environment', icon: Leaf, color: 'emerald' },
    { id: 'plus', label: 'Plus (+)', icon: Plus, color: 'gray' }
  ];

  let currentMonth = month;
  let selectedDate: Date | null = null;
  let showModal = false;
  let loading = true;
  let error: string | null = null;
  let checkins: any[] = [];

  // Calendar data
  let days: Array<{ date: Date, events: any[] }> = [];
  let weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Watch for changes in filter props
  $: {
    if (typeof window !== 'undefined' && !$isLoading && $user) {
      buildCalendar(currentMonth);
      loadEvents();
    }
  }

  function buildCalendar(date: Date) {
    days = [];
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // First day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    const dayOfWeek = firstDayOfMonth.getDay();
    
    // Last day of the month
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    
    // Previous month days to show (if first day isn't Sunday)
    const prevMonth = new Date(year, month, 0);
    const daysInPrevMonth = prevMonth.getDate();
    for (let i = dayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, daysInPrevMonth - i),
        events: []
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        events: []
      });
    }
    
    // Next month days to fill the last row
    const remainingDays = 7 - (days.length % 7);
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        days.push({
          date: new Date(year, month + 1, i),
          events: []
        });
      }
    }
  }

 async function loadEvents() {
  loading = true;
  error = null;

  try {
    if (!$user) throw new Error('Not authenticated');

    const { data: profile } = await supabase
      .from('profiles')
      .select('company_id, email')
      .eq('id', $user.id)
      .single();

    if (!profile?.company_id) throw new Error('Company not found');

    // Get start and end dates for calendar view (including adjacent months)
    const startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    const endDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 2, 0);
    
    // First, fetch sites data
    const { data: sitesData, error: sitesError } = await supabase
      .from('sites')
      .select('id, name')
      .eq('company_id', profile.company_id);
      
    if (sitesError) throw sitesError;
    
    // Then fetch departments data
    const { data: departmentsData, error: departmentsError } = await supabase
      .from('departments')
      .select('id, name')
      .eq('company_id', profile.company_id);
      
    if (departmentsError) throw departmentsError;
    
    // Create maps for quick lookup
    const sitesMap = new Map(sitesData?.map(site => [site.id, site.name]));
    const departmentsMap = new Map(departmentsData?.map(dept => [dept.id, dept.name]));
    
    // Query for checkins
    let checkinsQuery = supabase
      .from('daily_checkins')
      .select(`
        id,
        site_id,
        department_id,
        shift_date,
        shift_type,
        created_at,
        checkin_categories (
          category,
          status,
          notes
        )
      `)
      .eq('company_id', profile.company_id)
      .order('created_at', { ascending: false });

    // Apply filters
    if (siteId) {
      checkinsQuery = checkinsQuery.eq('site_id', siteId);
    }
    if (departmentId) {
      checkinsQuery = checkinsQuery.eq('department_id', departmentId);
    }

    const { data: checkinsData, error: checkinsError } = await checkinsQuery;

    if (checkinsError) throw checkinsError;

    // Clear existing events
    days.forEach(day => {
      day.events = [];
    });
    
    // Process checkin data
    checkinsData?.forEach(checkin => {
      const checkinDate = new Date(checkin.shift_date);
      const dayIndex = days.findIndex(day => 
        day.date.getDate() === checkinDate.getDate() && 
        day.date.getMonth() === checkinDate.getMonth() && 
        day.date.getFullYear() === checkinDate.getFullYear()
      );
      
      if (dayIndex >= 0) {
        // Add SQCDPE+ categories as separate events
        checkin.checkin_categories.forEach((category: any) => {
          const categoryInfo = categories.find(c => c.id === category.category);
          days[dayIndex].events.push({
            type: 'checkin',
            id: checkin.id,
            category: category.category,
            status: category.status,
            title: categoryInfo?.label || category.category,
            icon: categoryInfo?.icon,
            time: new Date(checkin.created_at).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
            notes: category.notes,
            site_id: checkin.site_id,
            site_name: sitesMap.get(checkin.site_id) || 'Unknown Site',
            department_id: checkin.department_id,
            department_name: departmentsMap.get(checkin.department_id) || 'Unknown Department',
            shift_type: checkin.shift_type
          });
        });
      }
    });

    // Update the days array to trigger UI refresh
    days = [...days];

  } catch (e) {
    console.error('Error loading events:', e);
    error = e instanceof Error ? e.message : 'Failed to load events';
  } finally {
    loading = false;
  }
}
  function changeMonth(offset: number) {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + offset);
    currentMonth = newMonth;
  }

  function isCurrentMonth(date: Date): boolean {
    return date.getMonth() === currentMonth.getMonth() && 
           date.getFullYear() === currentMonth.getFullYear();
  }

  function isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  }

  function isSelectedDate(date: Date): boolean {
    return selectedDate !== null && 
           date.getDate() === selectedDate.getDate() && 
           date.getMonth() === selectedDate.getMonth() && 
           date.getFullYear() === selectedDate.getFullYear();
  }

  function selectDate(date: Date) {
    if (isSelectedDate(date)) {
      // If already selected, toggle off
      selectedDate = null;
      showModal = false;
    } else {
      // Select the date and show modal if there are events
      selectedDate = date;
      const dayEvents = days.find(d => isSelectedDate(d.date))?.events || [];
      showModal = dayEvents.length > 0;
    }
  }

  function closeModal() {
    showModal = false;
  }

  function getStatusColor(status: string): string {
    switch (status) {
      case 'green': return 'bg-green-100 text-green-800';
      case 'yellow': return 'bg-yellow-100 text-yellow-800';
      case 'red': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  function getCategoryIcon(categoryId: string) {
    return categories.find(c => c.id === categoryId)?.icon || Plus;
  }

  function formatMonthYear(date: Date): string {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  onMount(() => {
    if (!$isLoading && $user) {
      buildCalendar(currentMonth);
      loadEvents();
    }
  });
</script>

<div class="bg-white rounded-xl shadow-lg p-4">
  <!-- Calendar Header and Navigation -->
  <div class="flex items-center justify-between mb-4">
    <h3 class="text-lg font-medium text-gray-900 flex items-center space-x-2">
      <Calendar class="w-5 h-5 text-gray-500" />
      <span>SQCDPE+ Calendar</span>
    </h3>
    
    <div class="flex items-center space-x-2">
      <button
        class="p-1 rounded-full hover:bg-gray-100"
        on:click={() => changeMonth(-1)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
      </button>
      
      <span class="text-sm font-medium text-gray-700">
        {formatMonthYear(currentMonth)}
      </span>
      
      <button
        class="p-1 rounded-full hover:bg-gray-100"
        on:click={() => changeMonth(1)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>

  <!-- Status Legend -->
  <div class="mb-4 flex flex-wrap gap-4">
    <div class="flex items-center space-x-2 text-xs">
      <div class="w-3 h-3 rounded-full bg-green-500"></div>
      <span>Good</span>
    </div>
    <div class="flex items-center space-x-2 text-xs">
      <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
      <span>Needs Attention</span>
    </div>
    <div class="flex items-center space-x-2 text-xs">
      <div class="w-3 h-3 rounded-full bg-red-500"></div>
      <span>Critical</span>
    </div>
  </div>

  {#if loading}
    <div class="flex items-center justify-center h-64">
      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  {:else if error}
    <div class="flex items-center justify-center h-64 text-red-500">
      <p>{error}</p>
    </div>
  {:else}
    <div class="w-full overflow-hidden">
      <!-- Weekday headers -->
      <div class="grid grid-cols-7 gap-1 mb-1">
        {#each weekdays as day}
          <div class="text-center text-xs font-medium text-gray-500 p-1">
            {day}
          </div>
        {/each}
      </div>
      
      <!-- Calendar grid -->
      <div class="grid grid-cols-7 gap-1">
        {#each days as day}
          <div 
            class="min-h-[90px] border rounded p-1 text-center relative {
              isCurrentMonth(day.date) 
                ? 'bg-white' 
                : 'bg-gray-50 text-gray-400'
            } {
              isToday(day.date) 
                ? 'border-blue-300' 
                : isSelectedDate(day.date)
                  ? 'border-indigo-300 bg-indigo-50'
                  : 'border-gray-200'
            } {day.events.length > 0 ? 'cursor-pointer hover:bg-gray-50' : ''}"
            on:click={() => day.events.length > 0 && selectDate(day.date)}
          >
            <div class="text-xs font-medium mb-1">
              {day.date.getDate()}
            </div>
            
            <!-- Events for this day -->
            <div class="space-y-1">
              {#each day.events.slice(0, 3) as event}
                <div 
                  class="flex items-center p-1 rounded text-xs overflow-hidden whitespace-nowrap {getStatusColor(event.status)}"
                  title={`${event.title} at ${event.time}`}
                >
                  <svelte:component 
                    this={getCategoryIcon(event.category)}
                    class="w-3 h-3 mr-1 flex-shrink-0"
                  />
                  <span class="truncate">{event.title}</span>
                </div>
              {/each}
              
              {#if day.events.length > 3}
                <div class="text-xs text-gray-500">
                  +{day.events.length - 3} more
                </div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
      
      <!-- Show modal for selected date -->
      {#if showModal && selectedDate}
        <DailyEventsModal 
          events={days.find(d => isSelectedDate(d.date))?.events || []}
          {selectedDate}
          onClose={closeModal}
        />
      {/if}
    </div>
  {/if}
</div>