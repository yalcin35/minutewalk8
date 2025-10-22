<script lang="ts">
  import { Calendar, Clock, Shield, BadgeCheck, DollarSign, Truck, Users, Leaf, Plus } from 'lucide-svelte';
  import { onMount } from 'svelte';
  
  export let events: any[] = [];
  export let selectedDate: Date;
  export let onClose: () => void;
  
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

  // Grouping options
  const groupingOptions = [
    { id: 'shift', label: 'Shift' },
    { id: 'department', label: 'Department' },
    { id: 'site', label: 'Site' }
  ];
  let selectedGrouping = 'shift';
  let groupedEvents: Record<string, any[]> = {};
  
  // Group events based on selected grouping option
  function groupEvents() {
    if (events.length === 0) return;
    
    if (selectedGrouping === 'shift') {
      // Group by shift_type
      groupedEvents = events.reduce((groups, event) => {
        const key = event.shift_type || 'Unspecified Shift';
        if (!groups[key]) groups[key] = [];
        groups[key].push(event);
        return groups;
      }, {});
    } 
    else if (selectedGrouping === 'department') {
      // Group by department_name
      groupedEvents = events.reduce((groups, event) => {
        const key = event.department_name || 'Unspecified Department';
        if (!groups[key]) groups[key] = [];
        groups[key].push(event);
        return groups;
      }, {});
    }
    else if (selectedGrouping === 'site') {
      // Group by site_name
      groupedEvents = events.reduce((groups, event) => {
        const key = event.site_name || 'Unspecified Site';
        if (!groups[key]) groups[key] = [];
        groups[key].push(event);
        return groups;
      }, {});
    }
  }
  
  // Watch for changes in grouping selection or events
  $: {
    if (events && events.length > 0) {
      groupEvents();
    }
  }
  
  function getCategoryIcon(categoryId: string) {
    return categories.find(c => c.id === categoryId)?.icon || Plus;
  }
  
  function getStatusColor(status: string): string {
    switch (status) {
      case 'green': return 'bg-green-100 text-green-800';
      case 'yellow': return 'bg-yellow-100 text-yellow-800';
      case 'red': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
  
  function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  // Initialize grouping on mount
  onMount(() => {
    groupEvents();
  });
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div class="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
    <div class="p-5 border-b">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-medium text-gray-900 flex items-center">
          <Calendar class="w-5 h-5 text-gray-500 mr-2" />
          {formatDate(selectedDate)}
        </h3>
        <button 
          class="text-gray-400 hover:text-gray-500" 
          on:click={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Grouping options -->
    <div class="px-5 py-3 border-b">
      <div class="flex items-center space-x-2">
        <span class="text-sm font-medium text-gray-700">Group by:</span>
        <div class="flex space-x-2">
          {#each groupingOptions as option}
            <button 
              class="px-3 py-1 text-sm rounded-full {selectedGrouping === option.id ? 'bg-blue-100 text-blue-800 font-medium' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}"
              on:click={() => { selectedGrouping = option.id; groupEvents(); }}
            >
              {option.label}
            </button>
          {/each}
        </div>
      </div>
    </div>
    
    <div class="p-5">
      {#if events.length === 0}
        <p class="text-center text-gray-500">No events for this day</p>
      {:else}
        <div class="space-y-6">
          {#each Object.entries(groupedEvents) as [groupName, groupItems]}
            <div class="border rounded-lg overflow-hidden">
              <div class="bg-gray-50 p-3 border-b">
                <h4 class="font-medium">{groupName}</h4>
              </div>
              <div class="divide-y">
                {#each groupItems as event}
                  <div class="p-3 hover:bg-gray-50">
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex items-center">
                        <div class="w-8 h-8 rounded-full flex items-center justify-center {getStatusColor(event.status)} mr-3">
                          <svelte:component 
                            this={getCategoryIcon(event.category)}
                            class="w-4 h-4"
                          />
                        </div>
                        <span class="font-medium">{event.title}</span>
                      </div>
                      <div class="flex items-center text-sm text-gray-600">
                        <Clock class="w-4 h-4 mr-1" />
                        {event.time}
                      </div>
                    </div>
                    
                    <!-- Display relevant information based on grouping type -->
                    <div class="ml-11 text-sm grid grid-cols-2 gap-x-4 gap-y-1">
                      {#if selectedGrouping !== 'site'}
                        <div>
                          <span class="font-medium text-gray-500">Site:</span> {event.site_name}
                        </div>
                      {/if}
                      
                      {#if selectedGrouping !== 'department'}
                        <div>
                          <span class="font-medium text-gray-500">Department:</span> {event.department_name}
                        </div>
                      {/if}
                      
                      {#if selectedGrouping !== 'shift'}
                        <div>
                          <span class="font-medium text-gray-500">Shift:</span> {event.shift_type}
                        </div>
                      {/if}
                    </div>
                    
                    {#if event.notes}
                      <div class="mt-2 ml-11 text-sm">
                        <p class="font-medium text-gray-500">Notes:</p>
                        <p class="text-gray-700 mt-1 bg-gray-50 p-2 rounded">{event.notes}</p>
                      </div>
                    {/if}
                  </div>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>