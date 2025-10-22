<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { setLocale, isLandingPage } from '$lib/i18n';
  import { Orbit, ArrowRight, ArrowUpRight, Users, Shield, Target, Globe, Book, Sparkles, Trophy, Clock, CircleCheck as CheckCircle2, TrendingUp } from 'lucide-svelte';
  import { goto } from '$app/navigation';

  let mounted = false;
  
  // Force English on public pages
  onMount(() => {
    // Set landing page flag and force English
    isLandingPage.set(true);
    setLocale('en');
  });
  
  const team = [
    {
      name: 'Yalçın Dündar',
      role: 'CEO & Founder',
      bio: '10+ years in Operational Excellence',
      image: 'https://profile-images.xing.com/images/a6d7276c20bd1f591664372bff814da0-1/yalcin-d%C3%BCndar.256x256.jpg?q=80&w=2940&auto=format&fit=crop'
    }
  ];

  const milestones = [
    { year: 2025, title: 'Company Founded', icon: Book },
    { year: 2025, title: 'First Major Client', icon: Target },
    { year: 2025, title: 'AI Platform Launch', icon: Sparkles },
    { year: 2026, title: 'Global Expansion', icon: Globe },
    { year: 2027, title: 'Industry Award Winner', icon: Trophy }
  ];
</script>

<svelte:head>
  <title>About MinuteWalk - Driving Operational Excellence</title>
</svelte:head>

<div class="relative">
  <!-- Navigation -->
 <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm">
  <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
    <!-- Clickable Logo and Brand Name -->
    <div
      class="flex items-center space-x-3 hover:opacity-80 transition-opacity cursor-pointer"
      on:click={() => goto('/')}
    >
      <div class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-500 flex items-center justify-center text-white">
        <Orbit class="w-6 h-6" />
      </div>
      <h1 class="text-2xl font-bold text-gray-900">MinuteWalk</h1>
      <span class="text-gray-500 italic hidden sm:inline">"Walk the Talk"</span>
    </div>

    <!-- Sign In Button -->
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
        <div class="space-y-8">
          <h1 class="text-6xl font-bold tracking-tight text-gray-900 leading-tight">
            Building the Future of <span class="bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">Smart Manufacturing</span>
          </h1>
          <p class="text-xl text-gray-600">
            At MinuteWalk, we're revolutionizing shopfloor operations through AI-powered insights and digital transformation. 
            Founded by industry veterans, we combine deep manufacturing expertise with cutting-edge technology.
          </p>
        </div>
        <div class="relative group">
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2940&auto=format&fit=crop"
            alt="Team collaboration"
            class="rounded-3xl shadow-2xl transform group-hover:scale-[0.99] transition-transform duration-500"
          />
          <div class="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-3xl" />
        </div>
      </div>
    </div>
  </section>

  <!-- Mission & Vision -->
  <section class="py-24 px-6 bg-white">
    <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
      <div class="p-8 bg-blue-50 rounded-2xl">
        <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
          <Target class="w-6 h-6 text-blue-600" />
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p class="text-gray-600 text-lg">
          Empower manufacturing leaders with real-time operational intelligence, transforming shopfloor insights into actionable strategies through AI-driven innovation.
        </p>
      </div>
      
      <div class="p-8 bg-purple-50 rounded-2xl">
        <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
          <Globe class="w-6 h-6 text-purple-600" />
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
        <p class="text-gray-600 text-lg">
          To become the global standard for operational excellence, where every manufacturing decision is data-driven and every workplace reaches its full potential.
        </p>
      </div>
    </div>
  </section>

  <!-- Core Values -->
  <section class="py-24 px-6 bg-gradient-to-b from-purple-50 via-white to-blue-50">
    <div class="max-w-7xl mx-auto">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-4xl font-medium text-gray-900 mb-4">
          Our Core Values
        </h2>
        <p class="text-gray-500">
          The principles that guide every decision and innovation at MinuteWalk
        </p>
      </div>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
            <Shield class="w-6 h-6 text-green-600" />
          </div>
          <h3 class="text-xl font-bold mb-3">Safety First</h3>
          <p class="text-gray-600">Uncompromising commitment to workplace safety and employee well-being</p>
        </div>
        
        <div class="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
            <Sparkles class="w-6 h-6 text-blue-600" />
          </div>
          <h3 class="text-xl font-bold mb-3">Innovation Driven</h3>
          <p class="text-gray-600">Constantly pushing boundaries in AI and operational technology</p>
        </div>
        
        <div class="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
            <Users class="w-6 h-6 text-purple-600" />
          </div>
          <h3 class="text-xl font-bold mb-3">Customer Centric</h3>
          <p class="text-gray-600">Solutions designed with and for manufacturing professionals</p>
        </div>
        
        <div class="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
            <TrendingUp class="w-6 h-6 text-orange-600" />
          </div>
          <h3 class="text-xl font-bold mb-3">Results Oriented</h3>
          <p class="text-gray-600">Focus on measurable improvements and ROI</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Team Section -->
<section class="py-24 px-6 bg-white">
  <div class="max-w-7xl mx-auto">
    <div class="text-center max-w-3xl mx-auto mb-16">
      <h2 class="text-4xl font-medium text-gray-900 mb-4">
        Meet Our Leadership
      </h2>
      <p class="text-gray-500">
        A diverse team united by passion for manufacturing excellence
      </p>
    </div>

    <!-- Updated Grid Layout -->
    <div class="flex justify-center">
      <div class="w-full md:w-1/2 lg:w-1/3">
        {#each team.filter(member => member.role === 'CEO & Founder') as member}
          <div class="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <img
              src={member.image}
              alt={member.name}
              class="h-80 w-full object-cover transform group-hover:scale-105 transition-transform"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 class="text-xl font-bold">{member.name}</h3>
              <p class="text-white/90">{member.role}</p>
              <p class="text-sm text-white/80 mt-2">{member.bio}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

  <!-- Milestones -->
  <section class="py-24 px-6 bg-blue-50">
    <div class="max-w-7xl mx-auto">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-4xl font-medium text-gray-900 mb-4">
          Our Journey
        </h2>
        <p class="text-gray-600">
          Key milestones in our mission to transform manufacturing
        </p>
      </div>
      
      <div class="flex flex-wrap justify-center gap-8">
        {#each milestones as milestone}
          <div class="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow w-64 text-center">
            <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <svelte:component this={milestone.icon} class="w-6 h-6 text-purple-600" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">{milestone.year}</h3>
            <p class="text-gray-600">{milestone.title}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-24 px-6 bg-gradient-to-r from-blue-600 to-purple-500">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-4xl font-medium text-white mb-6">
        Ready to Transform Your Operations?
      </h2>
      <p class="text-white/90 text-lg mb-8">
        Join hundreds of manufacturers achieving operational excellence with MinuteWalk
      </p>
      <button
        class="px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
        on:click={() => goto('/contact')}
      >
        <div class="flex items-center space-x-2">
          <span class="text-lg">Start Your Journey</span>
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
        <p>&copy; {new Date().getFullYear()} MinuteWalk. All rights reserved.</p>
      </div>
    </div>
  </footer>

<style>
  @keyframes float {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(20px, -20px); }
  }
</style>
    <!-- Include same footer code from landing page -->
</div>

<style>
  /* Add any custom animations if needed */
</style>