<template>
    <div class="">
        <form id="formCreate" @submit="form_submit" class="row g-3 mx-auto mt-4">
            <label class="col-sm-4 text-start text-sm-end">ชื่อสินค้า</label>
            <div class="col-sm-8">
                <input class="form-control" type="text" name="name" required />    
            </div>
            <label class="col-sm-4 text-start text-sm-end">ราคา</label>
            <div class="col-sm-8">
                <input class="form-control" type="number" name="price" required />    
            </div>
            <label class="col-sm-4 text-start text-sm-end">รายละเอียดสินค้า</label>
            <div class="col-sm-8">
                <textarea class="form-control" name="detail" row="2"></textarea>
            </div>
            <label class="col-sm-4 text-start text-sm-end">วันที่เพิ่มสินค้า</label>
            <div class="col-sm-8">
                <input class="form-control" type="date" name="date_added" required/>
            </div>
            <div class="col-12 text-center mt-4">
                <button class="btn btn-primary">ตกลง</button>
            </div>
        </form>
        
    </div>
</template>
<script>
export default {
    name : 'DbCreate',
    methods: {
        form_submit(event){
            event.preventDefault();
            const fd = new FormData(event.target);
            const fe = Object.fromEntries(fd.entries())
            fetch('http://localhost:3000/api/db/create',{
                method: 'POST',
                body:JSON.stringify(fe),
                headers: { 'Content-Type' : 'application/json'}
            })
            .then(response => response.text())
            .then(result => {
                if (result === 'true'){
                    event.target.reset();
                    alert('ข้อมูลถูกจัดเก็บแล้ว')
                }
            })

        }
    }
}
</script>
<style scoped>
    
</style>