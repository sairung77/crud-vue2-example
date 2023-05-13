<template>
    <nav id="nav" class="navbar navbar-expand-sm text-center">
        <div class="container-fluid">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link" to="/db/read">รายการข้อมูล</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/db/create">เพิ่ม</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/db/update">แก้ไข</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/db/delete">ลบ</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/db/paginate">แบ่งเพจ</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/db/search" :class="{'router-link-exact-active': this.$route.path == '/db/search'}"></router-link>
                </li>
            </ul>
        </div>
        
        
        
       
        
        
    </nav>
</template>
<script>
export default {
    /* eslint-disable */
    name: 'Menu'
}
</script>
<style scoped>
    
</style>