export function swalMessageError(info) {
    return {
        toast: true,
        position: 'top',
        showConfirmButton: false,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
        icon: 'warning',
        title: 'Pesan error',
        text: info,
    };
    //$('#modalInput').modal('hide');
}

export function swalMessageErrorWithTimer(info) {
    return {
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: info.length*70,
        timerProgressBar: true,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
        icon: 'warning',
        title: 'Pesan error',
        text: info,
    };
    //$('#modalInput').modal('hide');
}

export function swalAdded(counter) {
    return {
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
        icon: 'success',
        title: 'Berhasil',
        text: 'berhasil menambahkan data!',
    };
    //$('#modalInput').modal('hide');
}

export function swalUpdated() {
    return {
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000,
        //timerProgressBar: true,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
        icon: 'success',
        title: 'Berhasil',
        text: 'data telah diubah!',
        confirmButtonText: 'Oke',
    };
    //dropUpOpen=false;
    //$('#modalInput').modal('hide');
}

export function swalDeleted() {
    return {
        icon: 'success',
        title: 'Terhapus!',
        text: 'data telah dihapus.',
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false,
    };
}