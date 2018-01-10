<template>
    <transition name="dialog-fade">
        <div class="dialog-container">
            <div class="dialog" >
                <div class="dialog-title" v-html="title"></div>
                <div class="dialog-content" v-html="content" v-if="content"></div>
                <div class="dialog-actions">
                    <div class="btn" @click="cancel" v-html="cancelText">取消</div>
                    <div class="btn" @click="confirm" v-html="confirmText"></div>
                </div>
            </div>
            <div class="dialog-backdrop"></div>
        </div>
    </transition>
</template>
<script>
export default {
  props: {
      title: {
          type: String,
          default: ''
      },
      content: {
          type: String,
          default: ''
      },
      cancelText: {
          type: String,
          default: 'cancel'
      },
      confirmText: {
          type: String,
          default: 'confirm'
      }
  },
  data() {
      return {
          
      }
  },
  methods: {
      cancel() {
          this.$emit('cancel')
      },
      confirm() {
          this.$emit('confirm')
      }
  }
}
</script>
<style lang="less" scoped>
.dialog-container {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99999;
  .dialog {
    min-width: 280px;
    max-width: 80%;
    max-height: 80%;
    display: -ms-flexbox;
    display: flex;
    flex-flow: column;
    overflow: hidden;
    position: relative;
    z-index: 10;
    outline: none;
    border-radius: 2px;
    box-shadow: 0 7px 9px -4px rgba(0, 0, 0, 0.2),
      0 14px 21px 2px rgba(0, 0, 0, 0.14), 0 5px 26px 4px rgba(0, 0, 0, 0.12);
    background-color: #fff;
    .dialog-title {
    //   margin-bottom: 20px;
      padding: 24px 24px 0;
      font-size: 20px;
      font-weight: 500;
      letter-spacing: 0.005em;
      line-height: 26px;
      text-align: center;
    }
    .dialog-content {
      padding: 0 24px 24px;
      -ms-flex: 1;
      flex: 1;
      -ms-flex-preferred-size: auto;
      flex-basis: auto;
      overflow: auto;
      position: relative;
    }
    .dialog-actions {
      min-height: 52px;
      padding: 8px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
    }
  }
  .dialog-backdrop {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 6;
    pointer-events: none;
    background-color: rgba(0, 0, 0, 0.54);
  }
}

// 定义dialog动画
.dialog-fade-enter-active{
    animation: dialog-fadein 0.3s;
    .dialog{
        animation: dialog-zoom 0.3s;
    }
}
.dialog-fade-leave-active{
    opacity: 0;
    transition:  all .4s;
    .dialog{
        transform: scale(.9);
        transition:  all .3s;
    }
}
@keyframes dialog-fadein {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes dialog-zoom {
  0% {
    transform: scale(.9);
  }
  100% {
    transform: scale(1);
  }
}
</style>

