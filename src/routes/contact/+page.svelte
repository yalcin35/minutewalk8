<script lang="ts">
  import { goto } from '$app/navigation';
  import { fade, fly } from 'svelte/transition';
  import { setLocale, isLandingPage } from '$lib/i18n';
  import { 
    ArrowLeft, 
    Check,
    Asterisk,
    Monitor,
    Tablet,
    Users,
    ArrowRight,
    ArrowUpRight,
    Orbit,
    Mail
  } from 'lucide-svelte';
  
  import { onMount } from 'svelte';
  
  onMount(() => {
    // Set landing page flag and force English
    isLandingPage.set(true);
    setLocale('en');
  });

  let formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    plan: ''
  };

  let loading = false;
  let success = false;
  let error: string | null = null;

  async function handleSubmit(event: Event) {
    event.preventDefault();
    loading = true;
    error = null;

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '41ff39f9-202e-440b-87d2-d2fd4a3fb1c1',
          subject: `New Contact Form Submission - ${formData.plan} Plan`,
          from_name: 'MinuteWalk Contact Form',
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
          plan: formData.plan
        })
      });

      const result = await response.json();
      
      if (response.status === 200) {
        success = true;
        formData = {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          message: '',
          plan: ''
        };
      } else {
        throw new Error(result.message || 'Failed to submit form');
      }
    } catch (e) {
      console.error('Form submission error:', e);
      error = e instanceof Error ? e.message : 'Failed to submit form';
    } finally {
      loading = false;
    }
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-6">
  <!-- Back Button -->
  <button
    class="fixed top-6 left-6 flex items-center space-x-2 px-4 py-2 text-gray-600 
           hover:text-gray-900 transition-colors"
    on:click={() => goto('/')}
  >
    <ArrowLeft class="w-5 h-5" />
    <span>Back to Home</span>
  </button>

  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-16">
      <h1 class="text-4xl font-medium text-gray-900">Choose Your Plan</h1>
      <p class="mt-4 text-xl text-gray-500">Transform your operations with our flexible solutions</p>
    </div>

    <!-- Pricing Grid -->
    <div class="grid md:grid-cols-2 gap-8 mb-16">
      <!-- Standard Plan -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div class="p-8">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-medium text-gray-900">Standard per Site</h2>
              <p class="text-gray-500">Complete Digital Solution</p>
            </div>
            <Monitor class="w-8 h-8 text-blue-500" />
          </div>
          
          <div class="mt-6">
            <span class="text-4xl font-light">€799</span>
            <span class="text-gray-500">/month</span>
          </div>

          <ul class="mt-8 space-y-4">
            <li class="flex items-start">
              <Check class="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
              <span class="ml-3 text-gray-600">Full access to all platform features</span>
            </li>
            <li class="flex items-start">
              <Check class="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
              <span class="ml-3 text-gray-600">Unlimited users and audits</span>
            </li>
            <li class="flex items-start">
              <Check class="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
              <span class="ml-3 text-gray-600">Unlimited photo uploads</span>
            </li>
          <li class="flex items-start">
              <Check class="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
              <span class="ml-3 text-gray-600">AI-powered insights</span>
            </li>
            <li class="flex items-start">
              <Check class="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
              <span class="ml-3 text-gray-600">Premium support</span>
            </li>
          </ul>
        </div>
        
        <div class="px-8 pb-8">
          <button
            class="w-full py-3 px-6 text-center text-white bg-blue-500 hover:bg-blue-600
                   rounded-xl transition-colors"
            on:click={() => {
              formData.plan = 'Standard';
              document.getElementById('contactForm')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Get Started
          </button>
        </div>
      </div>

      <!-- Enterprise Plan -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden relative">
        <div class="absolute top-5 right-5">
          <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
            Most Popular
          </span>
        </div>

        <div class="p-8">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-medium text-gray-900">Enterprise</h2>
              <p class="text-gray-500">Complete Solution + Hardware + Expert</p>
            </div>
            <Users class="w-8 h-8 text-purple-500" />
          </div>
          
          <div class="mt-6">
            <span class="text-2xl font-medium">Custom Pricing</span>
            <p class="text-gray-500">Contact for details</p>
          </div>

          <ul class="mt-8 space-y-4">
            <li class="flex items-start">
              <Check class="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
              <span class="ml-3 text-gray-600">Everything in Standard plan</span>
            </li>
            <li class="flex items-start">
              <Check class="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
              <span class="ml-3 text-gray-600">Hardware bundle (TV, tablet, keyboard and mouse)</span>
            </li>
            <li class="flex items-start">
              <Check class="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
              <span class="ml-3 text-gray-600">Monthly on-site expert consultancy*</span>
            </li>
            <li class="flex items-start">
              <Check class="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
              <span class="ml-3 text-gray-600">Customized independent on-site audits*</span>
            </li>
             <li class="flex items-start">
              <Asterisk class="w-5 h-5 text-gray-300 flex-shrink-0 mt-1" />
              <span class="ml-3 text-gray-300">Currently only available in Hamburg</span>
            </li>
          </ul>
        </div>
        
        <div class="px-8 pb-8">
          <button
            class="w-full py-3 px-6 text-center text-white bg-purple-500 hover:bg-purple-600
                   rounded-xl transition-colors"
            on:click={() => {
              formData.plan = 'Enterprise';
              document.getElementById('contactForm')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>

    <!-- Contact Form -->
    <div id="contactForm" class="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-medium text-gray-900">Get in Touch</h2>
        <p class="mt-2 text-gray-500">Fill out the form below and we'll get back to you shortly</p>
      </div>

      {#if success}
        <div 
          class="bg-green-50 text-green-800 p-4 rounded-lg text-center"
          transition:fly={{ y: 20, duration: 300 }}
        >
          <h3 class="font-medium mb-2">Thank you for your interest!</h3>
          <p>We'll be in touch with you soon.</p>
        </div>
      {:else}
        <form class="space-y-6" on:submit={handleSubmit}>
          <input type="hidden" name="access_key" value="41ff39f9-202e-440b-87d2-d2fd4a3fb1c1">
          <input type="checkbox" name="botcheck" class="hidden" style="display: none;">
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1" for="firstName">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                bind:value={formData.firstName}
                class="w-full px-4 py-2 rounded-lg bg-gray-50 border-gray-200
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1" for="lastName">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                bind:value={formData.lastName}
                class="w-full px-4 py-2 rounded-lg bg-gray-50 border-gray-200
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1" for="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                bind:value={formData.email}
                class="w-full px-4 py-2 rounded-lg bg-gray-50 border-gray-200
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1" for="phone">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                bind:value={formData.phone}
                class="w-full px-4 py-2 rounded-lg bg-gray-50 border-gray-200
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1" for="company">
              Company Name
            </label>
            <input
              id="company"
              type="text"
              bind:value={formData.company}
              class="w-full px-4 py-2 rounded-lg bg-gray-50 border-gray-200
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1" for="message">
              Message
            </label>
            <textarea
              id="message"
              bind:value={formData.message}
              rows="4"
              class="w-full px-4 py-2 rounded-lg bg-gray-50 border-gray-200
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     resize-none"
              required
            ></textarea>
          </div>

          {#if error}
            <div 
              class="bg-red-50 text-red-600 p-4 rounded-lg"
              transition:fly={{ y: 20, duration: 300 }}
            >
              {error}
            </div>
          {/if}
          

          <button
            type="submit"
            class="w-full flex items-center justify-center space-x-2 py-3 px-6
                   bg-blue-500 text-white rounded-xl hover:bg-blue-600 
                   transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {#if loading}
              <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Sending...</span>
            {:else}
              <Mail class="w-5 h-5" />
              <span>Send Message</span>
            {/if}
            
          </button>
        </form>
      {/if}
      
    </div>
  </div>
</div>

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