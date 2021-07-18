<script>
import { onMount } from 'svelte';

  import Globalcss from './Globalcss.svelte'
  import {utils} from './worker'

  onMount(async () => {
    await utils.log("Logged from worker")
  })
</script>

<Globalcss />


<div class="bg-gray-800 flex items-center justify-center h-screen w-screen">
  <span class="text-gray-100 text-3xl font-semibold">Hello World</span>
</div>