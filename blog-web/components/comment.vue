<template>
  <div class="comment" v-if="siteConfig.discussStatus === 1 && artDiscuss === 1">
    <div class="comment-container">
      <div class="comment-title" id="tohere">
        共<span>{{commentsList.total}}</span>条评论
      </div>
      <div class="comment_tips">
        <p style="font-size: 16px;color: #000;font-weight: bold;">提示：</p>
        <p>评论会在审核通过后显示在下方</p>
        <p>昵称必填，用于展示在评论中</p>
        <p>邮箱必填，不会公开展示，方便及时收到回复</p>
        <p>网址选填，方便看到的人去访问,请完整填写,例如(http://www.brandhuang.com)</p>
      </div>
      <div class="comment_form">
        <!-- <el-form :model="artComment" ref="artComment">
          <input type="hidden" v-model="artComment.toemail" v-if="toReply !=''"/>
          <input type="hidden" v-model="artComment.tonickname" v-if="toReply !=''"/>
          <span v-if="toReply != ''" class="reply_to clearfix">回复：{{toReply}} <i class="el-icon-error"
                                                                                 style="float: right;margin-top: 3px;cursor: pointer;"
                                                                                 @click="cleanToReply"></i></span>
          <el-form-item
            label="内容(必填)："
            :rules="[{ required: true, message: '请输入评论内容', trigger: 'blur' }]"
            prop="content">
            <div class="comment-edit-container">
              <div class="commentEdit" ref="commentEdit"
                   id="commentTextDiv"
                   placeholder="说点什么呗，支持markdown语法哦..."
                   contenteditable="true"
                   @blur="commentChange($event)"
                   @focus="commentChange($event)"></div>
              <ul class="comment-tool-bar clearfix">
                <li>
                  <svgicon class="" name="emoji" style="width: 21px;margin-right: 6px;"
                           @click="showEmojiFn"></svgicon>
                </li>
                <li v-if="false">
                  <svgicon class="" name="link" style="width: 21px;margin-right: 6px;"
                           @click="insertContent('link')"></svgicon>
                </li>
                <li v-if="false">
                  <svgicon class="" name="code" style="width: 21px;margin-right: 6px;"
                           @click="insertContent('code')"></svgicon>
                </li>
                <li v-if="false">
                  <svgicon class="" name="image" style="width: 21px;margin-right: 6px;"
                           @click="insertContent('image')"></svgicon>
                </li>
              </ul>
              <ul class="emoji-container" v-show="showEmoji">
                <li v-for="item in emojiData" v-html="commentsRender(item)" :key="item"
                    @click="renderEmoji($event,item)"></li>
              </ul>
            </div>
          </el-form-item>
          <el-row :gutter="10">
            <el-col :sm="12" :md="8">
              <el-form-item
                prop="nickname"
                label="昵称(必填)："
                :rules="[{ required: true, message: '请输入昵称', trigger: 'blur' }]"
              >
                <el-input v-model="artComment.nickname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :md="8">
              <el-form-item
                prop="email"
                label="邮箱(必填)："
                :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
    ]"
              >
                <el-input v-model="artComment.email"></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :md="8">
              <el-form-item
                prop="webUrl"
                :rules="[
                  {required:false,validator: validateUrl, trigger: ['blur'] }
                  ]"
                label="网址(选填)：">
                <el-input v-model="artComment.webUrl"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item>
            <el-button id="commentSuccess" class="sbm_btn" type="primary" :loading="committing"
                       @click="postArtComment('artComment')">提交
            </el-button>
          </el-form-item>
        </el-form> -->
      </div>
      <div v-if="commentsList.data.length > 0" class="comment-list-wrap">
        <div class="comment-list" v-for="(item,index) in commentsList.data" :key="index">
          <div class="clearfix">

            <a :href="item.from_uweb" target="_blank" class="clearfix comment-user"
               v-if="item.from_uweb !=null && item.from_uweb.length > 0">
              <img :src="item.from_uavatar" alt="item.from_uname"><span>{{item.from_uname}}</span>
            </a>
            <div v-else class="clearfix comment-user nocursor">
              <img :src="item.from_uavatar" alt="item.from_uname"><span>{{item.from_uname}}</span>
            </div>
            <div class="comment-time">{{item.cdate}}</div>
          </div>
          <div class="comment-content" id="r-md-preview">
            <div class="comment-list replyContent-bg" v-if="item.oldContent != null">
              <div class="clearfix">
                <a :href="item.to_uweb" target="_blank" class="clearfix comment-user"
                   v-if="item.to_uweb != null && item.to_uweb.length > 0">
                  <img :src="item.to_uavatar" alt="item.from_uname"><span>{{item.to_uname}}</span>
                </a>
                <div v-else class="clearfix comment-user nocursor">
                  <img :src="item.to_uavatar" alt="item.from_uname"><span>{{item.to_uname}}</span>
                </div>
                <div class="comment-time">{{item.oldCdate}}</div>
              </div>
              <div class="comment-content">
                <div v-html="commentsRender(item.oldContent)"></div>
              </div>
            </div>
            <div v-html="commentsRender(item.content)"></div>
          </div>
          <div class="clearfix">
            <span class="replyBtn" @click="replyComment(item)">回复</span>
          </div>
        </div>
        <!-- <el-pagination
          style="text-align: center;"
          @current-change="getMoreArt"
          :current-page="commentsList.currentPage"
          :page-size="commentsList.limit"
          layout="prev, pager, next"
          :total="commentsList.total">
        </el-pagination> -->
      </div>
      <div v-else class="no-comment">
        快来抢个沙发吧
      </div>
    </div>
  </div>
  <div v-else class="cant-comment">
    站长暂未开启评论
  </div>
</template>

<script>
  import {mdRender} from '@/utils/utils'
  import * as htmlparser from 'htmlparser2'

  export default {
    props: {
      commentsList: {
        type: Object,
        required: true,
      },
      commentId: {
        type: Object,
        required: true,
      },
      artDiscuss: {
        type: Number,
        required: true,
      }
    },
    name: "comment",
    data() {
      let validateUrl = (rule, value, callback) => {
        let isUrl = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/i.test(value);

        if (value.length > 0 && isUrl == false) {
          this.urlIsCorrect = false
          callback(new Error('请输入正确的网址'))
        } else {
          callback()
          this.urlIsCorrect = true
        }
      };
      return {
        commentType: 'comment',
        committing: false,
        urlIsCorrect: true, // 输入网址后校验正确性
        toReply: '', // 要回复的用户
        artComment: {
          artId: this.commentId.id,
          email: '',
          nickname: '',
          content: '',
          webUrl: '',
          articleURL: ''
        },
        artCommentHTML: '',
        validateUrl: validateUrl,
        replyForm: {
          artId: this.commentId.id,
          email: '',
          nickname: '',
          content: '',
          webUrl: '',
          oldContent: '',
          touemail: '',
          touweb: '',
          touname: '',
          articleURL: '',
          oldId: ''
        },
        emojiData: [
          ':stuck_out_tongue_winking_eye:',
          ':smirk:',
          ':flushed:',
          ':cold_sweat:',
          ':sleeping:',
          ':sunglasses:',
          ':question:',
          ':thumbsup:',
          ':muscle:',
          ':clap:',
          ':new_moon_with_face:',
          ':ox:',
          ':beer:',
          ':see_no_evil:',
          ':hear_no_evil:',
          ':speak_no_evil:',
          ':v:',
          ':kissing_heart:',
          ':sob:',
          ':unamused:',
          ':horse:',
          ':pill:',
          ':confused:',
          ':broken_heart:',
          ':joy:',
          ':pensive:',
          ':sweat_smile:',
        ],
        showEmoji: false
      }
    },
    created() {

    },
    computed:{
      siteConfig(){
        return this.$store.state.config.config
      },
    },
    methods: {

      commentsRender(str) {
        return mdRender(str)
      },
      //翻页
      getMoreArt(val) {

        this.$store.dispatch('getComment', {id: this.commentId.id, currentPage: val});
        this.$nextTick(() => {
          let el = document.getElementById('commentSuccess')
          el.scrollIntoView()
        })
      },
      cleanToReply() {
        this.toReply = ''
        this.commentType = 'comment'
      },
      //发布评论
      postArtComment(formName) {
        let useInfo = {
          email: this.artComment.email,
          nickname: this.artComment.nickname,
          webUrl: this.artComment.webUrl,
        }
        localStorage.setItem("commentUserInfo", JSON.stringify(useInfo))
        this.$refs[formName].validate((valid) => {
          if (valid && this.urlIsCorrect) {
            let _that = this
            let result = ''
            let parser = new htmlparser.Parser({
              onopentag: function (name, attribs) {
                if (name === "script" || name === 'style' || name === "img" || name === 'frame' || name === 'iframe') {
                  // alert('小朋友不乖哟，不要乱输入！')
                }
              },
              ontext: function (text) {
                result += text
              },
              onclosetag: function (tagname) {
                if (tagname === "script" || tagname === "style" || tagname === "frame" || tagname === "iframe") {

                }
              }
            }, {decodeEntities: true})
            parser.write(this.artComment.content)
            parser.end()
            this.artComment.content = result
            if (!this.artComment.content || !this.artComment.content.replace(/\s/g, '')) return alert('内容就这样了？？！')
            this.committing = true
            if (this.commentType == 'comment') {
              this.artComment.articleURL = window.location.href
              this.$store.dispatch('addComment', this.artComment).then(res => {
                if (res.code === 200) {
                  this.$message.success(res.message)
                  this.artComment.content = ''
                  this.$refs.commentEdit.innerHTML = ''
                  this.$store.dispatch('getComment', {id: this.commentId.id});
                  let el = document.getElementById('commentSuccess')
                  el.scrollIntoView()
                  setTimeout(() => {
                    this.committing = false
                  }, 500)
                } else {
                  this.$message.error(res.message)
                }
              })
            } else {
              this.replyForm.artId = this.commentId.id
              this.replyForm.email = this.artComment.email
              this.replyForm.nickname = this.artComment.nickname
              this.replyForm.webUrl = this.artComment.webUrl
              this.replyForm.content = this.artComment.content
              this.replyForm.articleURL = window.location.href
              this.$store.dispatch('addReplyComment', this.replyForm).then(res => {
                if (res.code === 200) {
                  this.$message.success(res.message)
                  this.artComment.content = ''
                  this.$refs.commentEdit.innerHTML = ''
                  this.toReply = ''
                  this.commentType = 'comment'
                  this.$store.dispatch('getComment', {id: this.commentId.id});
                  let el = document.getElementById('commentSuccess')
                  el.scrollIntoView()
                  setTimeout(() => {
                    this.committing = false
                  }, 500)
                } else {
                  this.$message.error(res.message)
                }


              })
            }

          } else {
            setTimeout(() => {
              this.committing = false;
            }, 500);
            return false;
          }
        });
      },
      // 回复评论
      replyComment(item) {
        this.commentType = 'reply'
        this.toReply = item.from_uname
        let el = document.getElementById('tohere')
        el.scrollIntoView()
        this.$refs.commentEdit.focus()
        this.replyForm.content = ''
        this.replyForm.oldContent = item.content
        this.replyForm.oldCdate = item.timestamp
        this.replyForm.touemail = item.from_uemail
        this.replyForm.touweb = item.from_uweb
        this.replyForm.touname = item.from_uname
        this.replyForm.touavatar = item.from_uavatar
        this.replyForm.oldId = item.id
      },
      commentChange() {
        const html = this.$refs.commentEdit.innerHTML
        const text = this.$refs.commentEdit.innerText
        if (!Object.is(html, this.artComment.content)) {
          // this.artCommentHTML = html
        }
        if (!Object.is(text, this.artComment.content)) {
          this.artComment.content = text
        }
      },
      showEmojiFn(e) {
        e.stopPropagation()
        this.showEmoji = !this.showEmoji
      },
      renderEmoji(e, data) {
        e.stopPropagation()
        let str = mdRender(data).replace(/p/g, 'span')
        this.$refs.commentEdit.innerHTML += str
        this.showEmoji = false
        this.keepInLast()
        this.commentChange()
      },
      keepInLast() {
        var obj = document.getElementById('commentTextDiv')
        if (window.getSelection) {//ie11 10 9 ff safari
          obj.focus(); //解决ff不获取焦点无法定位问题
          var range = window.getSelection();//创建range
          range.selectAllChildren(obj);//range 选择obj下所有子内容
          range.collapseToEnd();//光标移至最后
        } else if (document.selection) {//ie10 9 8 7 6 5
          var range = document.selection.createRange();//创建选择对象
          //var range = document.body.createTextRange();
          range.moveToElementText(obj);//range定位到obj
          range.collapse(false);//光标移至最后
          range.select();
        }
      },
    },
    mounted() {
      let _that = this
      if (localStorage.getItem('commentUserInfo')) {
        this.artComment.email = JSON.parse(localStorage.getItem('commentUserInfo')).email || ''
        this.artComment.nickname = JSON.parse(localStorage.getItem('commentUserInfo')).nickname || ''
        this.artComment.webUrl = JSON.parse(localStorage.getItem('commentUserInfo')).webUrl || ''
      }
      document.onclick = function () {
        _that.showEmoji = false
      }

    }
  }
</script>

<style lang="scss">
.cant-comment{
  text-align: center;
  padding: 20px;
  font-size: 13px;
  color: #666;
}
  .comment {
    .comment-container {
      .comment-title {
        font-size: 13px;
        font-weight: bold;
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;

        span {
          color: darkorange;
          padding: 0 6px;
        }
      }

      .comment_tips {
        font-size: 12px;
        line-height: 24px;
        padding-top: 15px;
        color: #999;

        p {
          margin-bottom: 0;
        }
      }

      .comment_form {
        padding-top: 10px;

        .el-input__inner {
          background-color: #f6f8fa;
          color: #333;
        }

        .comment-edit-container {
          border: 1px solid #eee;
          margin-top: 40px;
          overflow: hidden;
          padding: 15px 15px 0;
          border-radius: 6px;
          position: relative;
          background-color: #f6f8fa;

          .commentEdit {
            height: 180px;
            line-height: 20px;
            width: 100%;
            overflow-y: scroll;
            outline: none;

            &:empty:before {
              content: attr(placeholder);
            }
          }

          .comment-tool-bar {
            height: 40px;
            overflow: hidden;

            li {
              height: 40px;
              list-style: none;
              float: left;
              cursor: pointer;

            }
          }

          .emoji-container {
            position: absolute;
            bottom: 40px;
            left: 0;
            background-color: #fff;
            border: 1px solid #eee;
            border-radius: 5px;
            width: 250px;
            height: 160px;
            overflow-y: auto;

            li {
              list-style: none;
              float: left;
              cursor: pointer;
              font-size: 16px;
              margin: 0 10px;
            }
          }
        }

        .reply_to {
          display: block;
          border: 1px solid #ddd;
          padding: 5px 10px;
          border-radius: 5px;
        }
      }

      .no-comment {
        background-color: #f6f8fa;
        text-align: center;
        color: #333;
        font-size: 14px;
        padding: 30px 0;
      }

      .comment-list-wrap {
        padding-top: 15px;
        border-top: 1px solid #eee;
      }

      .comment-list {
        border-bottom: 1px dashed #eee;
        padding-bottom: 10px;
        margin-bottom: 10px;

        .comment-user {
          display: block;
          float: left;

          img {
            display: inline-block;
            width: 20px;
            height: 20px;
            border-radius: 10px;
            float: left;
            margin-right: 10px;
          }

          span {
            display: inline-block;
            max-width: 100px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          line-height: 20px;
          font-size: 14px;
        }

        .comment-time {
          float: right;
          font-size: 12px;
          color: #333;
        }

        .comment-content {
          //text-indent: 2em;
          font-size: 0px;
          color: #333;
          line-height: 20px;
          padding: 8px 0;
          word-break: break-all;

          & > div {
            font-size: 13px;
          }
        }

        .replyBtn {
          float: right;
          font-size: 13px;
          cursor: pointer;
        }
      }
    }

    .replyContent-bg {
      background-color: #eee;
      padding: 10px;
      box-sizing: border-box;

      .comment-user, .comment-time {
        text-indent: 0;
      }
    }
  }
</style>
