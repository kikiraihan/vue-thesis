<template>
  <div class="bg-white overflow-auto rounded text-center text-sm py-5">
    <img class="saturate-50 opacity-60 d-block mr-auto ml-auto" src="@/assets/gambar/kosong_inbox.svg">
    <h5 class="text-lg">{{title}}</h5>
    <span class="text-sm">tidak ditemukan</span>

    <div class="pt-2">
        {{$slot}}
    </div>
</div>
</template>

<script>
export default {
    name: 'EmptyComponent',
    props: {
        title: {
            type: String,
            default: 'Data',
        },
    },
}
</script>

<style></style>