<template>
    <div class="bg-white overflow-auto rounded text-center text-sm py-5">
        <img class="saturate-0 opacity-80 animate-pulse mx-auto" src="@/assets/gambar/Progress_Outline.svg">
        <div class="animate-pulse text-gray-800 text-center">
            {{$t('loading.message')}} {{ message }}
        </div>

        <!-- <div class="pt-2">
            
        </div> -->
    </div>
</template>

<script>
    export default {
        name: "LoadingCenterImage",
        props: {
            message: String,
        },
    }
</script>