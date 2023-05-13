<template lang="">
    <div class="mt-4">
        <div v-if="result.totalDocs > 0">
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
                    <tr v-for="(d, i) in result.docs" :key="i">
                        <td>{{ d.name }}</td>
                        <td>{{ new Intl.NumberFormat().format(d.price)}}</td>
                        <td>{{ formatDate(d.date_added) }}</td>
                        <td>{{ d.detail }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="text-center mt-4">
                <template v-for="pg in result.totalPages">
                    <span v-if="pg == result.page" :key="pg">{{pg}}</span>
                    <a v-else :href="'/db/paginate?page='+pg" :key="pg">{{ pg }}</a>
                    <span v-show="pg < result.totalPages" :key="pg"> - </span>
                </template>
            </div>
        </div>
        <div v-else>
            <h6 class="text-center text-danger mt-3">{{ status }}</h6>
        </div>
    </div>
</template>
<script>
export default {
  name: "DbPaginate",
  data() {
    return {
      result: [],
      status: "กำลังโหลด"
    };
  },
  mounted() {
    let qStr = window.location.search;
    let params = new URLSearchParams(qStr);

    fetch("http://localhost:3000/api/db/paginate?" + params)
      .then(response => response.json())
      .then(result => {
        if (result.totalDocs > 0) {
          this.result = result;
        } else {
          this.result = [];
          this.status = "ไม่มีรายการข้อมูล";
        }
      })
      .catch(err => alert(err));
  },
  methods: {
    formatDate(date) {
      let d = new Date(Date.parse(date));
      return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
    }
  }
};
</script>
<style lang="">
</style>