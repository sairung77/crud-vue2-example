<template lang="">
    <div class="mt-4">
        <div v-if="docs.length > 0">
            <table id="data" class="table table-striped table-bordered mx-auto">
                <thead class="table-dark">
                    <tr>
                        <th>ชื่อสินค้า</th>
                        <th>ราคา</th>
                        <th>วันที่เพิ่มสินค้า</th>
                        <th>รายละเอียด</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(d, i) in docs" :key="i">
                        <td>{{ d.name }}</td>
                        <td>{{ new Intl.NumberFormat().format(d.price) }}</td>
                        <td>{{ formatDate(d.date_added) }}</td>
                        <td>{{ d.detail }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <h5 class="text-center text-danger">{{ status }}</h5>
        </div>
    </div>
</template>
<script>
export default {
  name: "DbRead",
  data() {
    return {
      docs: [],
      status: "กำลังโหลด"
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
    formatDate(date){
        let d = new Date(Date.parse(date));
        return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
    }
  }
};
</script>
<style scoped>
</style>