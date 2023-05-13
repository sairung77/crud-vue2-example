<template>
    <div class="mt-4">
        <div v-if="docs.length > 0">
            <form @submit="form_submit" class="mx-auto">
                <div class="text-center mb-2">เลือกรายการที่จะลบ จากนั้นคลิกปุ่มลบ</div>
                <table id="data" class="table table-striped table-bordered">
                    <thead class="table-dark">
                        <tr>
                            <th><button class="btn btn-sm btn-danger">ลบ</button></th>
                            <th>ชื่อสินค้า</th>
                            <th>ราคา</th>
                            <th>วันที่เพิ่มสินค้า</th>
                            <th>รายละเอียด</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(d, i) in docs" :key="i">
                            <td><input type="radio" name="_id" :value="d._id" v-model="isChecked" class="form-chack-input"/></td>
                            <td>{{ d.name }}</td>
                            <td>{{ new Intl.NumberFormat().format(d.price) }}</td>
                            <td>{{ formatDate(d.date_added) }}</td>
                            <td>{{ d.detail }}</td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
        <div v-else>
            <h5 class="text-center text-danger"> {{ status }}</h5>
        </div>
    </div>
</template>
<script>
export default {
    name : 'DbRead',
    data(){
        return {
            docs:[],
            status:'กำลังโหลด',
            isChecked: false
        }
    },
    mounted(){
        fetch('http://localhost:3000/api/db/read')
        .then(response => response.json())
        .then(result => {
            if(result.length > 0){
                this.docs = result;
            }else{
                this.docs = [];
                this.status = 'ไม่มีข้อมูล'
            }
        })
        .catch(err => alert(err))
    },
    methods:{
        formatDate(date){
            let d =new Date(Date.parse(date));
            return `${d.getDate()} ${d.getMonth() + 1} ${d.getFullYear()}`
        },
        form_submit(event){
            event.preventDefault();
            if(!this.isChecked){
                alert('กรุณาเลือกรายการที่จะลบ')
                return
            }

            if(!window.confirm('ยืนยันการลบรายการนี้')){
                return;
            }

            const fd = new FormData(event.target);
            const fe = Object.fromEntries(fd.entries());
            fetch('http://localhost:3000/api/db/delete',{
                method: 'POST',
                body: JSON.stringify(fe),
                headers: {'Content-Type': 'application/json'}
            })
            .then(response => response.json)
            .then(result => {
                if(result.error){
                    alert(result.error)
                }else {
                    alert('ข้อมูลถูกลบแล้ว')
                    location.href = '/db/delete'
                }
            })
            .catch(err => alert(err))
        }
    }
}
</script>
<style scoped>
    
</style>