// pages/detail/detail.js
Page({
 onLoad(option){
   wx.showLoading({
     title: 'Loading......',
   });
   wx.request({
     url: 'https://test-miniprogram.com/api/news/detail',
     data: {
       id: option.id
     },
     success: res => {
       let result = res.data.result
       let srcstd="网络消息"
       console.log(res.data.result)
       this.setData({
         title: result.title,
         source: result.source?result.source:srcstd,
         date: result.date.slice(0, 10) + ' ' + result.date.slice(11, 19),
         readcount:result.readCount,
         content:result.content})},
     complete: () => {
           
           wx.hideLoading()
         }
   })
   }
    
    
})