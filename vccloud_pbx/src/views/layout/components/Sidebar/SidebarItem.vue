<template>
  <div class="menu-wrapper">
    <template v-for="item in routes" v-if="!item.hidden&&item.children">

      <div v-if="item.children.length===1 && !item.children[0].children&&!item.alwaysShow">
        <div v-if="!item.button">
          <router-link :to="item.path+'/'+item.children[0].path" :key="item.children[0].name">
            <el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
              <i v-if="item.children[0].meta&&item.children[0].meta.icon" :class="item.children[0].meta.icon"></i>
              <span slot="title" v-if="item.children[0].meta&&item.children[0].meta.title">{{item.children[0].meta.title}}</span>
            </el-menu-item>
          </router-link>
        </div>
        <div v-else class="nav-item-has-btn">
          <el-menu-item v-if="item.button" :index="item.path" :class="{'submenu-title-noDropdown':!isNest}" @click="handleClickToggle">
            <i v-if="item.children[0].meta&&item.children[0].meta.icon" :class="item.children[0].meta.icon"></i>
            <span slot="title" v-if="item.children[0].meta&&item.children[0].meta.title">{{item.children[0].meta.title}}</span>

            <el-button size="mini" type="success" class="sidebar-item-button" @click="$router.push(item.button.redirect)">
              {{item.button.title}}
            </el-button>

          </el-menu-item>

          <div
            v-if="item.listNumber.length > 0" class="list-numbers"
          >
            <div
              v-for="number in item.listNumber"
              :key="number.name"
            >
              <el-submenu :index="number.name" v-if="number.status === 'registered'" class="center-number-dropdown">
                <template slot="title">
                  <span class="nav-item-ellipsis" :title="number.meta.title">{{number.meta.title}}</span>
                </template>

                <router-link :to="number.redirect.setting">
                  <el-menu-item :index="'1-'+number.name">Danh sách máy lẻ</el-menu-item>
                </router-link>

                <router-link :to="number.redirect.report">
                  <el-menu-item :index="'2-'+number.name">Cấu hình</el-menu-item>
                </router-link>
              </el-submenu>

              <el-menu-item
                v-else
                class="center-number"
                v-for="number in item.listNumber"
                :key="number.name"
                :index="number.name"
              >
                <!--<span class="fa-fw fa-fw number-index">{{index}}</span> -->
                <span class="nav-item-ellipsis" :title="number.meta.title">{{number.meta.title}}</span>
                <el-tag type="warning" class="sidebar-item-button">Chờ đăng ký</el-tag>
              </el-menu-item>
            </div>
          </div>

          <!--<div v-if="item.listNumber.length > 0">-->
            <!--<el-menu-item>-->
              <!---->
            <!--</el-menu-item>-->
          <!--</div>-->
        </div>
      </div>

      <el-submenu v-else :index="item.name||item.path" :key="item.name">
        <template slot="title">
          <i v-if="item.meta&&item.meta.icon" :class="item.meta.icon"></i>
          <span v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>

          <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
            <el-menu-item :index="item.path+'/'+child.path">
              <i v-if="child.meta&&child.meta.icon" :class="child.meta.icon"></i>
              <span v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SidebarItem',
  components: {},
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['sidebar'])
  },
  methods: {
    handleClickToggle() {
      if (!this.sidebar.opened) this.$store.dispatch('toggleSideBar')
    }
  }
}
</script>

<style>
  .sidebar-item-button {
    position: absolute!important;
    right: 18px;
    top: 14px;
  }

  .sidebar-item-button.dashboard {
    right: 63px!important;
  }

  .sidebar-item-button.hotline {
    top: 12px!important;
    padding: 9px 9px;
  }

  .center-number,
  .center-number-dropdown .el-submenu__title{
    padding-left: 40px!important;
    font-weight: bold;
  }

  .center-number-dropdown .el-menu li {
    padding-left: 60px!important;
  }

  .number-index {
    font-size: 16px;
    font-weight: bold;
    margin: 0 18px 0 18px;
    padding: 18px 0 18px 0;
  }

  /*.list-numbers {*/
    /*height: 200px;*/
    /*overflow-x: hidden;*/
    /*overflow-y: scroll;*/
  /*}*/

  .nav-item-ellipsis {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    max-width: 125px;
  }

  .list-numbers {
    max-height: 220px;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .list-numbers::-webkit-scrollbar {
    width: 3px;
  }

  .list-numbers::-webkit-scrollbar-thumb:vertical {
    margin: 15px;
    background-color: rgba(153, 153, 153, 0.5);
    -webkit-border-radius: 3px;
  }

  .list-numbers::-webkit-scrollbar-button:start:decrement,
  .list-numbers::-webkit-scrollbar-button:end:increment {
    height: 4px;
    display: block;
  }

  .list-numbers::-webkit-scrollbar {
    width: 4px;
  }
  .list-numbers::-webkit-scrollbar-track {
    border-radius: 3px;
    background: #18304e;
    border: 3px solid transparent;
  }
  .list-numbers::-webkit-scrollbar-thumb{
    border-radius: 3px;
    background: #18304e;
    border: 3px solid transparent;
  }
</style>
