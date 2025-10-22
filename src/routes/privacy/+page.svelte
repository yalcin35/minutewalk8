<script lang="ts">
  import { goto } from '$app/navigation';
  import { ArrowLeft } from 'lucide-svelte';
  import { setLocale, isLandingPage } from '$lib/i18n';
  import { onMount } from 'svelte';
  
  onMount(() => {
    // Set landing page flag and force English
    isLandingPage.set(true);
    setLocale('en');
  });
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

  <div class="max-w-4xl mx-auto">
    <div class="bg-white/70 backdrop-blur-sm shadow-lg rounded-2xl p-8 space-y-8">
      <!-- Header -->
      <div class="text-center border-b border-gray-200 pb-8">
        <h1 class="text-3xl font-medium text-gray-900">Privacy Policy</h1>
        <p class="mt-2 text-gray-500">Last Updated: {new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</p>
      </div>

      <!-- Table of Contents -->
      <div class="bg-gray-50 p-6 rounded-xl">
        <h2 class="text-xl font-medium text-gray-900 mb-4">Table of Contents</h2>
        <ol class="list-decimal list-inside space-y-2">
          <li><a href="#introduction" class="text-blue-600 hover:text-blue-800">Introduction</a></li>
          <li><a href="#data-collection" class="text-blue-600 hover:text-blue-800">Data Collection and Use</a></li>
          <li><a href="#eu-rights" class="text-blue-600 hover:text-blue-800">EU/EEA User Rights</a></li>
          <li><a href="#international" class="text-blue-600 hover:text-blue-800">International Data Transfers</a></li>
          <li><a href="#cookies" class="text-blue-600 hover:text-blue-800">Cookies and Tracking</a></li>
          <li><a href="#third-parties" class="text-blue-600 hover:text-blue-800">Third-Party Services</a></li>
          <li><a href="#california" class="text-blue-600 hover:text-blue-800">California Privacy Rights</a></li>
          <li><a href="#contact" class="text-blue-600 hover:text-blue-800">Contact Information</a></li>
        </ol>
      </div>

      <!-- Introduction -->
      <section id="introduction" class="space-y-4">
        <h2 class="text-2xl font-medium text-gray-900">Introduction</h2>
        <p class="text-gray-600">
          MinuteWalk ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our audit platform and related services. We are headquartered in Germany and operate globally, adhering to the highest standards of data protection.
        </p>
        <p class="text-gray-600">
          This policy complies with the EU General Data Protection Regulation (GDPR), German Federal Data Protection Act (BDSG), California Consumer Privacy Act (CCPA), and other applicable privacy laws.
        </p>
      </section>

      <!-- Data Collection and Use -->
      <section id="data-collection" class="space-y-4">
        <h2 class="text-2xl font-medium text-gray-900">Data Collection and Use</h2>
        <div class="space-y-4">
          <h3 class="text-xl font-medium text-gray-800">Information We Collect</h3>
          <ul class="list-disc list-inside space-y-2 text-gray-600">
            <li>Account Information (name, email, company details)</li>
            <li>Audit Data (photos, notes, scores, timestamps)</li>
            <li>Usage Information (device data, IP address, browser type)</li>
            <li>Communication Data (support inquiries, feedback)</li>
          </ul>

          <h3 class="text-xl font-medium text-gray-800">How We Use Your Information</h3>
          <ul class="list-disc list-inside space-y-2 text-gray-600">
            <li>Providing and improving our services</li>
            <li>Processing and storing audit data</li>
            <li>Analyzing platform usage and trends</li>
            <li>Communicating with users about service updates</li>
            <li>Ensuring platform security and preventing fraud</li>
          </ul>
        </div>
      </section>

      <!-- EU/EEA User Rights -->
      <section id="eu-rights" class="space-y-4">
        <h2 class="text-2xl font-medium text-gray-900">EU/EEA User Rights</h2>
        <p class="text-gray-600">Under the GDPR, users in the EU/EEA have the following rights:</p>
        <ul class="list-disc list-inside space-y-2 text-gray-600">
          <li>Right to access your personal data</li>
          <li>Right to rectification of inaccurate data</li>
          <li>Right to erasure ("right to be forgotten")</li>
          <li>Right to restrict processing</li>
          <li>Right to data portability</li>
          <li>Right to object to processing</li>
          <li>Right to withdraw consent</li>
        </ul>
        <p class="text-gray-600">
          To exercise these rights, please contact our Data Protection Officer using the contact information below.
        </p>
      </section>

      <!-- International Data Transfers -->
      <section id="international" class="space-y-4">
        <h2 class="text-2xl font-medium text-gray-900">International Data Transfers</h2>
        <p class="text-gray-600">
          We store and process data in the European Union. However, we may transfer data internationally to provide our services. When we do, we ensure appropriate safeguards are in place through:
        </p>
        <ul class="list-disc list-inside space-y-2 text-gray-600">
          <li>Standard Contractual Clauses approved by the European Commission</li>
          <li>Binding Corporate Rules for transfers within our group</li>
          <li>Adequacy decisions issued by the European Commission</li>
        </ul>
      </section>

      <!-- Cookies and Tracking -->
      <section id="cookies" class="space-y-4">
        <h2 class="text-2xl font-medium text-gray-900">Cookies and Tracking</h2>
        <p class="text-gray-600">We use the following types of cookies:</p>
        <ul class="list-disc list-inside space-y-2 text-gray-600">
          <li>Essential cookies for platform functionality</li>
          <li>Analytics cookies to improve our services</li>
          <li>Preference cookies to remember your settings</li>
        </ul>
        <p class="text-gray-600">
          You can control cookies through your browser settings. However, disabling certain cookies may limit platform functionality.
        </p>
      </section>

      <!-- Third-Party Services -->
      <section id="third-parties" class="space-y-4">
        <h2 class="text-2xl font-medium text-gray-900">Third-Party Services</h2>
        <p class="text-gray-600">We work with the following service providers:</p>
        <ul class="list-disc list-inside space-y-2 text-gray-600">
          <li>Supabase (Database and Authentication)</li>
          <li>Google Cloud Platform (AI Services)</li>
          <li>Netlify (Hosting)</li>
        </ul>
        <p class="text-gray-600">
          These providers process data according to our instructions and comply with applicable data protection laws.
        </p>
      </section>

      <!-- California Privacy Rights -->
      <section id="california" class="space-y-4">
        <h2 class="text-2xl font-medium text-gray-900">California Privacy Rights</h2>
        <p class="text-gray-600">
          Under the CCPA, California residents have specific rights regarding their personal information:
        </p>
        <ul class="list-disc list-inside space-y-2 text-gray-600">
          <li>Right to know what personal information is collected</li>
          <li>Right to delete personal information</li>
          <li>Right to opt-out of the sale of personal information</li>
          <li>Right to non-discrimination for exercising CCPA rights</li>
        </ul>
      </section>

      <!-- Contact Information -->
      <section id="contact" class="space-y-4">
        <h2 class="text-2xl font-medium text-gray-900">Contact Information</h2>
        <div class="bg-gray-50 p-6 rounded-xl">
          <h3 class="text-xl font-medium text-gray-800 mb-4">Data Protection Officer</h3>
          <p class="text-gray-600">
            For privacy-related inquiries or to exercise your rights, contact our Data Protection Officer:
          </p>
          <div class="mt-4 space-y-2 text-gray-600">
            <p>Email: info@alyasolutions.com</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</div>