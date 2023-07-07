<template>    
    <div class="relative">
        
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <i class="bx bxs-virus text-2xl text-gray-500"></i>
        </div>
        <button @click="open = ! open" type="button" class="cursor-pointer pl-10 p-4 text-sm w-full flex justify-between bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-inset focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <span :key="terpilih">
                {{ terpilih }}
            </span>
            <div class="absolute right-0 bottom-1.5 font-medium px-4 py-2">
                <i class="bx bx-caret-down text-xl text-gray-500"></i>
            </div>
        </button>

        <div v-show="open"
        class="rounded shadow-md my-2 absolute pin-t pin-l bg-gray-50 w-full z-20">
            <ul class="list-reset" @click="open = ! open">
                <li class="p-2">
                    <input class="border-2 rounded h-8 w-full" placeholder="Cari" type="text">
                    <br>
                </li>
                <slot></slot> <!-- slot outlet -->
            </ul>
        </div>

    </div>
</template>


<script>
export default {
    name: 'SelectSearchLite',
    props: {
        terpilih: {
            type: String,
            default: '...',
        },
        // storage: {
        //     type: Object,
        //     required: true,
        // }
    },
    data () {
        return {
            open:false,
            // terpilih: "...",
        }
    },
    methods: {
    },
    mounted () {
    }

}
</script>

<style>

</style>