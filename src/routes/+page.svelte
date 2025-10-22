<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { 
    Orbit,
    ClipboardCheck,
    Truck,
    ArrowRight, 
    CircleCheck as CheckCircle2, 
    Sparkles, 
    Target, 
    TrendingUp, 
    ArrowUpRight,
    Camera,
    Brain,
    BarChart3,
    Mic,
    Search,
    List,
    MessageCircle,
    Users,
    Shield
  } from 'lucide-svelte';
  import { goto } from '$app/navigation';
  import { user } from '$lib/supabase';

  let mounted = false;
  let scrollY: number;
  let innerHeight: number;

  // SQCDPE+ Feedback State
  const feedbackState = {
    safety: null as 'green' | 'yellow' | 'red' | null,
    quality: null as 'green' | 'yellow' | 'red' | null,
    cost: null as 'green' | 'yellow' | 'red' | null,
    delivery: null as 'green' | 'yellow' | 'red' | null,
    people: null as 'green' | 'yellow' | 'red' | null,
    environment: null as 'green' | 'yellow' | 'red' | null,
  };

  const sqcdpeMessages = {
    safety: {
      green: "Excellent safety practices! Keep up the great work!",
      yellow: "Safety procedures need attention. Schedule a review.",
      red: "“Safety isn't expensive, it's priceless.” — Jerry Smith"
    },
    quality: {
      green: "Quality standards exceeded! Outstanding work!",
      yellow: "Quality metrics slipping. Investigate root causes.",
      red: "“Quality is never an accident; it is always the result of intelligent effort.” — John Ruskin"
    },
    cost: {
      green: "Cost controls effective. Well optimized processes!",
      yellow: "Cost overruns detected. Review budget allocations.",
      red: "“Beware of little expenses; a small leak will sink a great ship.” — Benjamin Franklin"
    },
    delivery: {
      green: "Perfect delivery performance! Customer satisfaction guaranteed!",
      yellow: "Delivery delays emerging. Optimize logistics.",
      red: "“Whatever you do, do with determination. You have one life to live; do your work with passion.” — A.P.J. Abdul Kalam"
    },
    people: {
      green: "Team performing exceptionally! Morale is high!",
      yellow: "Employee engagement needs improvement.",
      red: "“People are not your most important asset. The right people are.” — Jim Collins"
    },
    environment: {
      green: "Environmental targets achieved! Sustainable operations!",
      yellow: "Environmental metrics need monitoring.",
      red: "“We won't have a society if we destroy the environment.” — Margaret Mead"
    }
  };

  function handleFeedback(category: keyof typeof feedbackState, color: 'green' | 'yellow' | 'red') {
    if (feedbackState[category] === color) {
      // Toggle off if clicking same color
      feedbackState[category] = null;
    } else {
      feedbackState[category] = color;
    }
  }

  onMount(() => {
    mounted = true;
  });
  
  // Variables and handler for the interactive CTA background
  let mouseX = 50;
  let mouseY = 50;
  
  function handleMouseMove(e: MouseEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width) * 100;
    mouseY = ((e.clientY - rect.top) / rect.height) * 100;
  }
  
  const features = [
    { 
      icon: CheckCircle2,
      title: 'Streamlined Audits',
      description: 'Complete digital audits in minutes with our intuitive interface and guided workflow'
    },
    {
      icon: Camera,
      title: 'Photo Evidence',
      description: 'Capture and document workplace conditions with built-in photo capabilities'
    },
    {
      icon: Brain,
      title: 'AI Insights',
      description: 'Get instant AI-powered analysis and recommendations for improvement'
    },
    {
      icon: BarChart3,
      title: 'Progress Tracking',
      description: 'Monitor improvements over time with detailed analytics and reports'
    }
  ];
  
  const features2 = [
    { 
      icon: Mic,
      title: 'Instant, Accurate Transcription',
      description: 'Automatic speech-to-text transcription with high accuracy'
    },
    {
      icon: Search,
      title: 'Smart Action Item Analysis',
      description: 'AI-driven analysis of meeting content and action items'
    },
    {
      icon: List,
      title: 'Prioritize with SQCDPE+',
      description: 'SQCDPE+ categorization with smart prioritization'
    },
    {
      icon: MessageCircle,
      title: 'Actionable Feedback & Ideas',
      description: 'Detailed improvement suggestions and feedback'
    }
  ];
  
  const benefits = [
    {
      title: 'Increase Efficiency',
      description: 'Reduce waste and optimize workflows through systematic organization',
      image: 'https://www.thescxchange.com/media-library/image-of-warehouse-for-digital-twin.png?id=55505740&width=1245&height=700&quality=90&coordinates=1%2C0%2C1%2C0?q=80&w=2940&auto=format&fit=crop'
    },
    {
      title: 'Improve Safety',
      description: 'Create a safer workplace by identifying and addressing hazards',
      image: 'https://tervene.com/wp-content/uploads/2019/12/index.jpg?q=80&w=2940&auto=format&fit=crop'
    },
    {
      title: 'Boost Quality',
      description: 'Maintain high standards through regular audits and continuous improvement',
      image: 'https://s35804.pcdn.co/blog/wp-content/uploads/2021/05/1239-digital-warehouse.jpg?q=80&w=2940&auto=format&fit=crop'
    }
  ];
</script>

<svelte:head>
  <title>MinuteWalk - AI-Powered Operational Excellence</title>
</svelte:head>

<div class="relative">
  <!-- Navigation -->
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-500 flex items-center justify-center text-white">
          <Orbit class="w-6 h-6" />
        </div>
        <h1 class="text-2xl font-bold text-gray-900">MinuteWalk</h1>
        <span class="text-gray-500 italic hidden sm:inline">"Walk the Talk"</span>
      </div>
      
      <button
        class="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-lg hover:bg-blue-600 
               transition-colors flex items-center space-x-2"
        on:click={() => goto('/signin')}
      >
        <span>Sign In</span>
        <ArrowUpRight class="w-4 h-4" />
      </button>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="pt-32 pb-24 px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <div class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Hero Content -->
        <div class="space-y-8">
          <h1 class="text-6xl font-bold tracking-tight text-gray-900 leading-tight">
            Insight in Every Step, <span class="bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">Impact in Every Word</span>
          </h1>
          <p class="text-xl text-gray-600">
            Transform your operational excellence with AI-powered shopfloor walks and SQCPDE+ meetings. The all-in-one platform for manufacturing leaders to drive continuous improvement.
          </p>
          
          <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              class="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-xl shadow-xl 
                     hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
              on:click={() => goto('/signin')}
            >
              <div class="flex items-center space-x-2">
                <span class="text-lg">Get Started</span>
                <ArrowUpRight class="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </button>
            
            <button 
              class="w-full sm:w-auto px-8 py-4 bg-white text-slate-600 rounded-xl border-2 border-purple-100 hover:border-purple-200
                     hover:bg-slate-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              on:click={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <div class="flex items-center space-x-2">
                <span>See How It Works</span>
                <ArrowRight class="inline-block w-5 h-5 transition-transform" />
              </div>
            </button>
          </div>
        </div>
        
        <!-- Hero Image -->
        <div class="relative group">
          <img
            src="https://goaudits.com/wp-content/uploads/2024/10/Warehouse-Audit-Inspections.jpg?q=80&w=2940&auto=format&fit=crop"
            alt="Organized workplace"
            class="rounded-3xl shadow-2xl transform group-hover:scale-[0.99] transition-transform duration-500"
          />
          <div class="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-3xl" />
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section for Walk -->
  <section id="features" class="py-24 px-6 bg-white">
    <div class="max-w-7xl mx-auto">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-5xl font-medium text-gray-900 mb-4">
          Walk The Talk
        </h2>
        <p class="text-gray-500">
          Streamline your workplace assessments with AI-powered digital walks. Capture photos, score audit questions, and receive instant feedback from our specialized AI to improve your operations, safety, and efficiency.
        </p>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {#each features as feature}
          <div class="group p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300">
            <svelte:component 
              this={feature.icon}
              class="w-10 h-10 text-blue-500 mb-4"
            />
            <h3 class="text-xl font-medium mb-2">{feature.title}</h3>
            <p class="text-gray-500">{feature.description}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- New Widget Card: Walk Types & Auditing Man Photo -->
  <section id="walk-widget" class="py-24 px-6 bg-white">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col lg:flex-row bg-white shadow-lg rounded-2xl overflow-hidden">
        <!-- Widget Content -->
        <div class="p-8 flex-1">
          <h2 class="text-2xl font-bold mb-4">Explore Our Digital Walks</h2>
          <p class="text-gray-600 mb-4">
            Transform your shopfloor audits with actionable insights. Each walk is tailored to target key areas of your operations:
          </p>
          <ul class="space-y-3">
            <li class="flex items-start space-x-3">
              <div class="bg-indigo-100 p-2 rounded-full flex-shrink-0 mt-1">
                <ClipboardCheck class="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <strong class="text-lg text-gray-800">Digital 5S Walk</strong>
                <p class="text-gray-500">Streamline organization and boost efficiency by evaluating workplace standards.</p>
              </div>
            </li>
            <li class="flex items-start space-x-3">
              <div class="bg-indigo-100 p-2 rounded-full flex-shrink-0 mt-1">
                <Orbit class="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <strong class="text-lg text-gray-800">Digital Gemba Walk</strong>
                <p class="text-gray-500">Engage with frontline operations to capture real‑time insights and drive improvement.</p>
              </div>
            </li>
            <li class="flex items-start space-x-3">
              <div class="bg-orange-100 p-2 rounded-full flex-shrink-0 mt-1">
                <Truck class="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <strong class="text-lg text-gray-800">Digital MHE Walk</strong>
                <p class="text-gray-500">Assess material handling and equipment performance for smoother workflows.</p>
              </div>
            </li>
            <li class="flex items-start space-x-3">
              <div class="bg-green-100 p-2 rounded-full flex-shrink-0 mt-1">
                <Shield class="w-5 h-5 text-green-600" />
              </div>
              <div>
                <strong class="text-lg text-gray-800">Digital HSE Walk</strong>
                <p class="text-gray-500">Focus on safety and compliance with clear, data‑driven audit results.</p>
              </div>
            </li>
          </ul>
        </div>
        <!-- Image Content -->
        <div class="flex-1 relative">
          <img 
            src="https://cdn-ilaeadh.nitrocdn.com/UnAFfTqfoHKRwMhikRtSYtATXULTzYKf/assets/images/optimized/rev-863aedd/www.amsc-usa.com/wp-content/uploads/2023/03/warehouse-audit-team.jpg?q=80&w=2940&auto=format&fit=crop" 
            alt="Auditing team performing a workplace inspection" 
            class="object-cover w-full h-full"
          />
          <div class="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- Visual Showcase -->
  <section class="py-24 bg-gradient-to-b from-blue-50 via-white to-purple-50">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div class="space-y-8">
          <h2 class="text-4xl font-bold text-gray-900">
            From Chaos to Control in 30 Days
          </h2>
          <p class="text-xl text-gray-600">
            See how leading manufacturers achieve:
          </p>
          <ul class="space-y-6">
            <li class="flex items-center space-x-4">
              <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 class="w-5 h-5 text-green-600" />
              </div>
              <span class="text-lg">90%+ audit completion rate</span>
            </li>
            <li class="flex items-center space-x-4">
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield class="w-5 h-5 text-blue-600" />
              </div>
              <span class="text-lg">60% reduction in safety incidents</span>
            </li>
            <li class="flex items-center space-x-4">
              <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Users class="w-5 h-5 text-purple-600" />
              </div>
              <span class="text-lg">4x faster team alignment</span>
            </li>
          </ul>
        </div>
        <div class="relative group">
          <img
            src="https://www.globaltranz.com/wp-content/uploads/sites/2/Logistics-Management.jpg?q=80&w=2940&auto=format&fit=crop"
            alt="Dashboard interface"
            class="rounded-3xl shadow-2xl transform group-hover:scale-99 transition-transform duration-500"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent rounded-3xl" />
        </div>
      </div>
    </div>
  </section>

  <!-- SQCDPE+ Interactive Section -->
  <section id="sqcdpe-plus-feature" class="py-24 px-6 bg-white">
    <div class="max-w-7xl mx-auto">
      <div class="text-center max-w-3xl mx-auto mb-12">
        <h2 class="text-4xl font-bold text-gray-900 mb-6">
          Experience SQCDPE+ Feedback
        </h2>
        <p class="text-lg text-gray-600">
          Click the traffic lights to get real-time feedback for each operational category
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Safety -->
        <div class="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
          <div class="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
            <svg viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
              <path d="M12 2L1 21h22L12 2zm0 3.96L19.07 19H4.93L12 5.96z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Safety</h3>
          <p class="text-gray-600 text-sm mb-2">
            Current safety status indicators
          </p>
          <div class="flex space-x-2">
            <button 
              on:click={() => handleFeedback('safety', 'green')}
              class="w-6 h-6 rounded-full border-2 transition-colors
                     {feedbackState.safety === 'green' ? 'bg-green-500 border-transparent' : 'bg-transparent border-green-500'}"
            ></button>
            <button 
              on:click={() => handleFeedback('safety', 'yellow')}
              class="w-6 h-6 rounded-full border-2 transition-colors
                     {feedbackState.safety === 'yellow' ? 'bg-yellow-500 border-transparent' : 'bg-transparent border-yellow-500'}"
            ></button>
            <button 
              on:click={() => handleFeedback('safety', 'red')}
              class="w-6 h-6 rounded-full border-2 transition-colors
                     {feedbackState.safety === 'red' ? 'bg-red-500 border-transparent' : 'bg-transparent border-red-500'}"
            ></button>
          </div>
          {#if feedbackState.safety}
            <p class="mt-4 text-sm italic text-gray-700">
              {sqcdpeMessages.safety[feedbackState.safety]}
            </p>
          {/if}
        </div>

        <!-- Quality -->
        <div class="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
          <div class="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
            <svg viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Quality</h3>
          <p class="text-gray-600 text-sm mb-2">
            Product/service quality status
          </p>
          <div class="flex space-x-2">
            <button 
              on:click={() => handleFeedback('quality', 'green')}
              class="w-6 h-6 rounded-full border-2 transition-colors
                     {feedbackState.quality === 'green' ? 'bg-green-500 border-transparent' : 'bg-transparent border-green-500'}"
            ></button>
            <button 
              on:click={() => handleFeedback('quality', 'yellow')}
              class="w-6 h-6 rounded-full border-2 transition-colors
                     {feedbackState.quality === 'yellow' ? 'bg-yellow-500 border-transparent' : 'bg-transparent border-yellow-500'}"
            ></button>
            <button 
              on:click={() => handleFeedback('quality', 'red')}
              class="w-6 h-6 rounded-full border-2 transition-colors
                     {feedbackState.quality === 'red' ? 'bg-red-500 border-transparent' : 'bg-transparent border-red-500'}"
            ></button>
          </div>
          {#if feedbackState.quality}
            <p class="mt-4 text-sm italic text-gray-700">
              {sqcdpeMessages.quality[feedbackState.quality]}
            </p>
          {/if}
        </div>

        <!-- Cost -->
        <div class="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
          <div class="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">
            <svg viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
              <path d="M11.8 10.9c-2.27-.12-4.1-.97-4.1-3.3 0-2.84 2.43-4.8 5.1-4.8 2.66 0 4.93 1.96 4.93 4.8 0 2.33-1.83 3.18-4.1 3.3-2.27.12-4.1.97-4.1 3.3 0 2.84 2.43 4.8 5.1 4.8 2.66 0 4.93-1.96 4.93-4.8 0-2.33-1.83-3.18-4.1-3.3zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Cost</h3>
          <p class="text-gray-600 text-sm mb-2">
            Cost management indicators
          </p>
          <div class="flex space-x-2">
            <button 
              on:click={() => handleFeedback('cost', 'green')}
              class="w-6 h-6 rounded-full border-2 transition-colors
                     {feedbackState.cost === 'green' ? 'bg-green-500 border-transparent' : 'bg-transparent border-green-500'}"
            ></button>
            <button 
              on:click={() => handleFeedback('cost', 'yellow')}
              class="w-6 h-6 rounded-full border-2 transition-colors
                     {feedbackState.cost === 'yellow' ? 'bg-yellow-500 border-transparent' : 'bg-transparent border-yellow-500'}"
            ></button>
            <button 
              on:click={() => handleFeedback('cost', 'red')}
              class="w-6 h-6 rounded-full border-2 transition-colors
                     {feedbackState.cost === 'red' ? 'bg-red-500 border-transparent' : 'bg-transparent border-red-500'}"
            ></button>
          </div>
          {#if feedbackState.cost}
            <p class="mt-4 text-sm italic text-gray-700">
              {sqcdpeMessages.cost[feedbackState.cost]}
            </p>
          {/if}
        </div>

        <!-- Delivery -->
        <div class="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
          <div class="w-16 h-16 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mb-4">
            <svg viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
              <path d="M13.5 9H15v6H9v-4c0-1.66 1.34-3 3-3h1.5V9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Delivery</h3>
          <p class="text-gray-600 text-sm mb-2">
            Delivery performance status
          </p>
          <div class="flex space-x-2">
            <button 
              on:click={() => handleFeedback('delivery', 'green')}
              class="w-6 h-6 rounded-full border-2 transition-colors
                     {feedbackState.delivery === 'green' ? 'bg-green-500 border-transparent' : 'bg-transparent border-green-500'}"
            ></button>
            <button 
              on:click={() => handleFeedback('delivery', 'yellow')}
              class="w-6 h-6 rounded-full border-2 transition-colors
                     {feedbackState.delivery === 'yellow' ? 'bg-yellow-500 border-transparent' : 'bg-transparent border-yellow-500'}"
            ></button>
            <button 
              on:click={() => handleFeedback('delivery', 'red')}
              class="w-6 h-6 rounded-full border-2 transition-colors
                     {feedbackState.delivery === 'red' ? 'bg-red-500 border-transparent' : 'bg-transparent border-red-500'}"
            ></button>
          </div>
          {#if feedbackState.delivery}
            <p class="mt-4 text-sm italic text-gray-700">
              {sqcdpeMessages.delivery[feedbackState.delivery]}
            </p>
          {/if}
        </div>

        <!-- People -->
        <div class="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
          <div class="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
            <svg viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
              <path d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4zm0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">People</h3>
          <p class="text-gray-600 text-sm mb-2">
            Team performance indicators
          </p>
          <div class="flex space-x-2">
            <button 
              on:click={() => handleFeedback('people', 'green')}
              class="w-6 h-6 rounded-full border-2 transition-colors
                     {feedbackState.people === 'green' ? 'bg-green-500 border-transparent' : 'bg-transparent border-green-500'}"
            ></button>
            <button 
              on:click={() => handleFeedback('people', 'yellow')}
              class="w-6 h-6 rounded-full border-2 transition-colors
                     {feedbackState.people === 'yellow' ? 'bg-yellow-500 border-transparent' : 'bg-transparent border-yellow-500'}"
            ></button>
            <button 
              on:click={() => handleFeedback('people', 'red')}
              class="w-6 h-6 rounded-full border-2 transition-colors
                     {feedbackState.people === 'red' ? 'bg-red-500 border-transparent' : 'bg-transparent border-red-500'}"
            ></button>
          </div>
          {#if feedbackState.people}
            <p class="mt-4 text-sm italic text-gray-700">
              {sqcdpeMessages.people[feedbackState.people]}
            </p>
          {/if}
        </div>

        <!-- Environment -->
        <div class="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
          <div class="w-16 h-16 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mb-4">
            <svg viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
              <path d="M17 6c0 2.76-2.24 5-5 5S7 8.76 7 6a5 5 0 0110 0zm-5 7c-3.87 0-7 3.13-7 7h14c0-3.87-3.13-7-7-7zm12-3V8l-4-4-4 4v2c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Environment</h3>
          <p class="text-gray-600 text-sm mb-2">
            Environmental impact status
          </p>
          <div class="flex space-x-2">
            <button 
              on:click={() => handleFeedback('environment', 'green')}
              class="w-6 h-6 rounded-full border-2 transition-colors
                     {feedbackState.environment === 'green' ? 'bg-green-500 border-transparent' : 'bg-transparent border-green-500'}"
            ></button>
            <button 
              on:click={() => handleFeedback('environment', 'yellow')}
              class="w-6 h-6 rounded-full border-2 transition-colors
                     {feedbackState.environment === 'yellow' ? 'bg-yellow-500 border-transparent' : 'bg-transparent border-yellow-500'}"
            ></button>
            <button 
              on:click={() => handleFeedback('environment', 'red')}
              class="w-6 h-6 rounded-full border-2 transition-colors
                     {feedbackState.environment === 'red' ? 'bg-red-500 border-transparent' : 'bg-transparent border-red-500'}"
            ></button>
          </div>
          {#if feedbackState.environment}
            <p class="mt-4 text-sm italic text-gray-700">
              {sqcdpeMessages.environment[feedbackState.environment]}
            </p>
          {/if}
        </div>
      </div>

      <div class="mt-12 text-center">
        <h3 class="text-2xl font-semibold text-gray-800 mb-4">Experience the Power of AI Review</h3>
        <p class="text-lg text-gray-600 mb-6">
          Imagine the insights <span class="font-bold text-purple-600">Gemini Flash 2.0</span> can provide based on this feedback.
        </p>
        <button
          class="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300"
          on:click={() => goto('/contact')}
        >
          <div class="flex items-center space-x-2">
            <span class="text-lg">Contact Us for Pricing</span>
            <ArrowUpRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>
    </div>
  </section>

  <!-- Benefits Section -->
  <section class="py-24 px-6 bg-gradient-to-b from-purple-50 via-white to-blue-50">
    <div class="max-w-7xl mx-auto">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-4xl font-medium text-gray-900 mb-4">
          Unlock Operational Excellence
        </h2>
        <p class="text-gray-500">
          Revamp your workspace with cutting-edge tools that drive efficiency, safety, and continuous improvement. Elevate your operations with AI-driven insights that streamline audits, enhance safety, and boost performance. Transform the potential of your team and workplace with data-driven solutions that ensure safety, quality, and productivity.
        </p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        {#each benefits as benefit}
          <div class="group relative overflow-hidden rounded-2xl">
            <img
              src={benefit.image}
              alt={benefit.title}
              class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 class="text-xl font-medium mb-2">{benefit.title}</h3>
              <p class="text-white/80">{benefit.description}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- CTA Section with Mouse Tracking Background -->
  <section 
    class="py-24 px-6 relative overflow-hidden" 
    on:mousemove={handleMouseMove}
    role="region"
    aria-label="Call to action"
    style="background: linear-gradient(to right, #7e22ce, #3b82f6);"
  >
    <!-- Interactive radial gradient layer -->
    <div class="absolute inset-0 pointer-events-none">
      <div 
        class="absolute inset-0" 
        style="background: radial-gradient(circle at {mouseX}% {mouseY}%, rgba(255,255,255,0.25), transparent 50%); transition: background 0.1s ease-out;"
      ></div>
    </div>
    
    <div class="max-w-4xl mx-auto text-center relative">
      <h2 class="text-4xl font-medium text-white mb-6">
        Ready to Transform Your Workplace?
      </h2>
      <p class="text-white/90 text-lg mb-8">
        Join hundreds of organizations using MinuteWalk to improve their shopfloor operations.
      </p>
      <button
        class="px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
        on:click={() => goto('/contact')}
      >
        <div class="flex items-center space-x-2">
          <span class="text-lg">Get Started Today</span>
          <ArrowUpRight class="w-5 h-5" />
        </div>
      </button>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-6 py-12">
      <div class="grid md:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-500 flex items-center justify-center text-white">
              <Orbit class="w-5 h-5" />
            </div>
            <span class="text-lg font-medium">MinuteWalk</span>
          </div>
          <p class="text-gray-400">
            "Walk with Purpose, Talk with Impact"
          </p>
        </div>

        <!-- Product -->
        <div>
          <h3 class="text-lg font-medium mb-4">Product</h3>
          <ul class="space-y-2">
            <li>
              <button
                class="text-gray-400 hover:text-white transition-colors"
                on:click={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Features
              </button>
            </li>
            <li>
              <button
                class="text-gray-400 hover:text-white transition-colors"
                on:click={() => goto('/contact')}
              >
                Pricing
              </button>
            </li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h3 class="text-lg font-medium mb-4">Company</h3>
          <ul class="space-y-2">
            <li>
              <button
                class="text-gray-400 hover:text-white transition-colors"
                on:click={() => goto('/about')}
              >
                About
              </button>
            </li>
            <li>
              <button
                class="text-gray-400 hover:text-white transition-colors"
                on:click={() => goto('/contact')}
              >
                Contact
              </button>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h3 class="text-lg font-medium mb-4">Legal</h3>
          <ul class="space-y-2">
            <li>
              <button
                class="text-gray-400 hover:text-white transition-colors"
                on:click={() => goto('/privacy')}
              >
                Privacy Policy
              </button>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
        &copy; {new Date().getFullYear()} MinuteWalk. All rights reserved.
      </div>
    </div>
  </footer>
</div>

<style>
  @keyframes float {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(20px, -20px); }
  }
</style>