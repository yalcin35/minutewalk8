<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase, user, isLoading } from '$lib/supabase';
  import { Calendar, Clock, ClipboardCheck, Shield, Truck, Orbit } from 'lucide-svelte';

  // Constants for scoring calculation
  const MAX_POINTS_PER_QUESTION = 5;
  const QUESTIONS_PER_CATEGORY = 5;
  const TOTAL_QUESTIONS = 25;

  export let siteId: string | null = null;
  export let departmentId: string | null = null;
  export let month: Date = new Date();

  // Walk types with their colors
  const walkTypes = [
    { id: '5s', label: '5S Walk', icon: ClipboardCheck, color: 'blue' },
    { id: 'hse', label: 'HSE Walk', icon: Shield, color: 'red' },
    { id: 'mhe', label: 'MHE Walk', icon: Truck, color: 'orange' },
    { id: 'gemba', label: 'Gemba Walk', icon: Orbit, color: 'green' }
  ];

  let currentMonth = month;
  let selectedDate: Date | null = null;
  let loading = true;
  let error: string | null = null;
  let walks: any[] = [];

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
    
    // Previous month days to show
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
    
    // Next month days
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
      // Get user's company
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single();

      if (!profile?.company_id) throw new Error('Company not found');

      // Get start and end dates for calendar view
      const startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
      const endDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 2, 0);
      
      // Query for audits with join to audit_setups
      // FIXED: Modified the query to properly handle the relationships
      const { data: auditsData, error: auditError } = await supabase
        .from('audits')
        .select(`
          id,
          created_at,
          data,
          audit_setups!inner (
            audit_type,
            site_id,
            department_id
          )
        `)
        .eq('company_id', profile.company_id)
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString());

      if (auditError) throw auditError;

      // Clear existing events
      days.forEach(day => {
        day.events = [];
      });
      
      // Add audit events to days
      auditsData?.forEach(audit => {
        const auditDate = new Date(audit.created_at);
        const dayIndex = days.findIndex(day => 
          day.date.getDate() === auditDate.getDate() && 
          day.date.getMonth() === auditDate.getMonth() && 
          day.date.getFullYear() === auditDate.getFullYear()
        );
        
        if (dayIndex >= 0) {
          days[dayIndex].events.push({
            type: 'walk',
            id: audit.id,
            walkType: audit.audit_setups.audit_type,
            title: `${audit.audit_setups.audit_type.toUpperCase()} Walk`,
            time: auditDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
            location: `${audit.audit_setups.site_id.site_name} - ${audit.audit_setups.department_id.department_name}`,
            score: audit.data.score || 0
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
    selectedDate = isSelectedDate(date) ? null : date;
  }

  function getWalkTypeColor(type: string): string {
    const walkType = walkTypes.find(w => w.id === type);
    return walkType ? `bg-${walkType.color}-100 text-${walkType.color}-800` : 'bg-gray-100 text-gray-800';
  }

  function getWalkTypeIcon(type: string) {
    return walkTypes.find(w => w.id === type)?.icon || ClipboardCheck;
  }

  function getScoreColor(score: number): string {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
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
  <div class="flex items-center justify-between mb-4">
    <h3 class="text-lg font-medium text-gray-900 flex items-center space-x-2">
      <Calendar class="w-5 h-5 text-gray-500" />
      <span>Walk Calendar</span>
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

  <!-- Legend -->
  <div class="mb-4 flex flex-wrap gap-4">
    {#each walkTypes as walkType}
      <div class="flex items-center space-x-2 text-xs">
        <svelte:component this={walkType.icon} class="w-4 h-4 text-{walkType.color}-600" />
        <span>{walkType.label}</span>
      </div>
    {/each}
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
            }"
            on:click={() => selectDate(day.date)}
          >
            <div class="text-xs font-medium mb-1">
              {day.date.getDate()}
            </div>
            
            <!-- Events for this day -->
            <div class="space-y-1">
              {#each day.events.slice(0, 3) as event}
                <div 
                  class="flex items-center p-1 rounded text-xs overflow-hidden whitespace-nowrap {getWalkTypeColor(event.walkType)}"
                  title={`${event.title} at ${event.time}`}
                >
                  <svelte:component 
                    this={getWalkTypeIcon(event.walkType)}
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
      
      <!-- Selected day details -->
      {#if selectedDate && days.find(d => isSelectedDate(d.date))?.events.length > 0}
        <div class="mt-4 p-3 border rounded-lg bg-gray-50">
          <h4 class="text-sm font-medium text-gray-700 mb-2">
            Walks on {selectedDate.toLocaleDateString()}
          </h4>
          
          <div class="space-y-2">
            {#each days.find(d => isSelectedDate(d.date))?.events || [] as event}
              <div class="flex items-center space-x-2 p-2 bg-white rounded-lg shadow-sm">
                <div class="p-1.5 rounded-full {getWalkTypeColor(event.walkType)}">
                  <svelte:component 
                    this={getWalkTypeIcon(event.walkType)}
                    class="w-4 h-4"
                  />
                </div>
                
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <p class="text-sm font-medium">{event.title}</p>
                    <span class={`text-sm font-medium ${getScoreColor(event.score)}`}>
                      {Math.round(event.score)}%
                    </span>
                  </div>
                  <div class="text-xs text-gray-500">
                    <div class="flex items-center">
                      <Clock class="w-3 h-3 mr-1" />
                      <span>{event.time}</span>
                    </div>
                    <div class="mt-1">{event.location}</div>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  {/if}
</div>