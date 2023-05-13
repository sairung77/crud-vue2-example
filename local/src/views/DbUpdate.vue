<template lang="">
    <div class="mt-4">
        <div v-if="docs.length > 0">
            <form @submit="form_submit" class="mx-auto">
                <table id="data" class="table table-striped table-bordered">
                    <thead class="table-dark">
                        <tr>
                            <th>แก้ไข</th>
                            <th>ชื่อสินค้า</th>
                            <th>ราคา</th>
                            <th>วันที่เพิ่มสินค้า</th>
                            <th>รายละเอียด</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-warning bg-opacity-25">
                            <td><button class="btn btn-primary" @click="null">แก้ไข</button></td>
                            <td><input type="text" name="name" ref="name" class="form-control"/></td>
                            <td><input type="number" name="price" size="2" ref="price" class="form-control"/></td>
                            <td><input type="date" name="date_added" ref="date_added" class="form-control"/></td>
                            <td><textarea name="detail" rows="2" ref="detail" class="form-control"></textarea></td>
                        </tr>
                        <tr v-for="(d, i) in docs" :key="i">
                            <td><input type="radio" name="_id" :value="d._id" v-model="isChecked" class="form-check-input" @click="radio_click(d)"/></td>
                            <td>{{ d.name }}</td>
                            <td>{{ new Intl.NumberFormat().format(d.price) }}</td>
                            <td>{{ formatDate(d.date_added) }}</td>
                            <td>{{ d. detail }}</td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
        <div v-else>
            <h5 class="text-center text-danger">{{ status }}</h5>
        </div>
    </div>
</template>
<script>
export default {
  name: "dbRead",
  data() {
    return {
      docs: [],
      status: "กำลังโหลด",
      isChecked: false
    };
  },
  mounted() {
    fetch("http://localhost:3000/api/db/read")
      .then(response => response.json())
      .then(result => {
        if (result.length > 0) {
          this.docs = result;
        } else {
          this.docs = [];
          this.status = "ไม่มีรายการข้อมูล";
        }
      })
      .catch(err => alert(err));
  },
  methods: {
    formatDate(date) {
      let d = new Date(Date.parse(date));
      return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
    },
    radio_click(doc) {
      this.$ref.name.value = doc.name;
      this.$ref.price.value = doc.price;
      let dt = new Date(Date.parse(doc.date_added));
      let y = dt.getFullYear();
      let m = dt.getMonth() + 1;
      m = m >= 10 ? m : "0" + m;
      let d = dt.getDate();
      d = d >= 10 ? d : "0" + d;
      this.$ref.date_added.value = `${y}-${m}-${d}`
      this.$ref.detail.value = doc.detail;
    },
    form_submit(event){
        event.preventDefault();
        if(!this.isChecked){
            alert('กรุณาเลือกรายการจะแก้ไข')
            return;
        } 
        if(!window.confirm('ยืนยันแก้ไขรายการนี้')){
            return;
        }

        const fd = new FormData(event.target);
        const fe = Object.fromEntries(fd.entries())
        fetch('http://localhost:3000/api/db/update',{
            method : 'POST',
            body: JSON.stringify(fe),
            headers: {'Content-Type' : 'application/json'}
        })
        .then(response => response.json())
        .then(result => {
            if(result.error){
                alert(result.error)
            }else{
                alert('ข้อมูลถูกแก้ไขแล้ว')
                location.href = '/db/update'
            }
        })
        .catch(err => alert(err))
    }
  }
};
</script>
<style lang="">
</style>