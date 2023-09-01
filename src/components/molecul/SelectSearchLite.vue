<template>    
    <div class="relative">
        
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <i class="bx bx-network-chart text-2xl text-gray-500"></i>
        </div>
        <button @click="open = ! open" type="button" class="cursor-pointer pl-10 p-4 text-sm w-full flex justify-between bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-inset focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <span :key="terpilih">
                {{ terpilih? terpilih : $t('AnalyseData.1.input.placeholder') }}
            </span>
            <!-- <div class="absolute right-0 bottom-1.5 font-medium px-4 py-2">
                <i class="bx bx-caret-down text-xl text-gray-500"></i>
            </div> -->
        </button>
        <button @click="$emit('proses-visualisasi')" type="submit"
            class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {{$t('AnalyseData.1.input.button')}}
        </button>

        <div v-show="open" class="rounded shadow-md my-2 absolute pin-t pin-l bg-gray-50 w-full z-20">
            <ul class="list-reset">
                <!-- <li class="p-2">
                    <input class="border-2 rounded h-8 w-full px-2" placeholder="Cari" type="text">
                    <br>
                </li> -->
                <div @click="open = ! open">
                    <slot></slot> <!-- slot outlet -->
                </div>
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