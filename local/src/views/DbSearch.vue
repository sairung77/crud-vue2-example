<template lang="">
    <div class="mt-4">
        <form action="/db/search" method="get" class="mx-auto text-end tb-2">
            <div class="d-flex justify-content-between">
                <div class="mt-2 ms-5 fw-bold">
                    สินค้าทั้งหมด {{result.totalDocs || 0}} รายการ
                </div>
                <div class="input-group" style="max-width:250px">
                    <input type="text" name="q" :value="this.$route.query.q || ''" class="form-control form-control-sm"/>
                    <button class="btn btn-sm btn-success">ค้นหา</button>
                </div>
            </div>
        </form>
        <div v-if="result.totalDocs > 0">
            <table id="data" class="table tabled-striped table-bordered mx-auto">
                <thead class="table-dark">
                    <tr>
                        <th>ชื่อสินค้า</th>
                        <th>ราคา</th>
                        <th>วันที่เพิ่ม</th>
                        <th>รายละเอียด</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(d, i) in result.docs" :key="i">
                        <td>{{ d.name }}</td>
                        <td>{{ new Intl.NumberFormat().format(d.price) }}</td>
                        <td> {{ formatDate(d.date_added) }} </td>
                        <td>{{ d.detail }}</td>
                    </tr>
                </tbody>
            </table>
            <!--หมายเลขเพจ-->
            <div v-show="result.totalPages > 1" class="text-center mt-4">
                <ul class="pagination justify-content-center">
                    <li v-show="start > 1" class="page-item" :key="pg">
                        <a :href="url + 1" class="page-link">|&lt;</a>
                    </li>
                    <li v-show="start > 1" class="page-item">
                        <a :href="url+ ( start - 1)" class="page-link">&lt;</a>
                    </li>
                    <template v-for="pg in pageNums">
                        <li v-if="pg == result.page" class="page-item" :key="pg">
                            <a class="page-link active text-danger tabindex='-1'">{{ pg }}</a>
                        </li>
                        <li v-else class="page-item" :key="pg">
                            <a :href="url + pg" class="page-link">{{ pg }}</a>
                        </li>
                    </template>

                    <li v-show="end < result.totalPages" class="page-item">
                        <a :href="url + (end + 1)" class="page-link">&gt;</a>
                    </li>
                    <li v-show="end < result.totalPages" class="page-item">
                        <a :href="url + result.totalPages" class="page-link">&gt;|</a>
                    </li>
                </ul>
            </div>
        </div>
        <div v-else>
            <h6 class="text-center text-danger mt-3">{{ status }}</h6>
        </div>
    </div>
</template>
<script>
export default {
    name: 'DbSearch',
    data(){
        return {
            result : [],
            status: 'กำลังโหลด',
            url: `/db/search?q=${this.$route.query.q | ''}&page=`
        }
    },
    mounted(){
        let qStr =window.location.search
        let params = new URLSearchParams(qStr);

        fetch('http://localhost:3000/api/db/search?'+ params)
        .then(response => response.json())
        .then(result => {
            if(result.totalDocs > 0){
                this.result = result;
            }else{
                this.result = [];
                this.status = 'ไม่มีรายการข้อมูล'
            }
        })
        .catch(err => alert(err))
    },
    methods:{
        formatDate(date){
            let d =new Date(Date.parse(date));
            return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
        }
    },
    computed:{
        start(){
            let start = this.result.page - 2
            return start < 1 ? 1 : start
        },
        end(){
            let end = this.result.page + 2
            return ( (end < this.result.totalPages)?  end : this.result.totalPages)
        },
        pageNums(){
            let p = []
            for(var i = this.start; i<= this.end;i++){
                p.push(i)
            }
            return p
        }
    }
};
</script>
<style scoped>
</style>