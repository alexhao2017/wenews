Page({
  data:{
  newscat:
  [
    {id:'gn',text:'国内'},
    {id:'gj',text:'国际'},
    {id:'cj',text:'财经'},
    {id:'yl',text:'娱乐'},
    {id:'js',text:'技术'},
    {id:'ty',text:'体育'},
    {id:'other',text:'其他'}
  ] ,
  id:'gn'
},
getNews(cat,callback,success){
    wx.showLoading({
    title: 'Loading......',
    });
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: cat
      },
      success:success ,
      complete: () => {
        if (typeof callback === 'function' && callback()){
        callback && callback()};
        wx.hideLoading()
      }
    })
  },
 onTapNews(e) {
    let id = String(e.currentTarget.dataset.no)
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
 },
onPullDownRefresh(){
  this.getNews(this.data.id,() => {
     wx.stopPullDownRefresh()
  },
    res => {
      res.data.result.forEach(obj => {
        obj.date = obj.date.slice(0, 10) + ' ' + obj.date.slice(11, 19);
        obj.source ? obj.source : obj.source = '网络消息';
        obj.firstImage ? obj.firstImage : 'https://pic3.zhimg.com/80/v2-abc532a979acb0411d0c2579c8ec92ee_hd.jpg'
      });
      this.setData({
        hot: res.data.result[0],
        news: res.data.result.slice(1)
      })
    }
  
  )
},
formalInfo(obj){
  obj.date = obj.date.slice(0, 10) + ' ' + obj.date.slice(11, 19);
  obj.source ? obj.source : obj.source = '网络消息';
  obj.firstImage ? obj.firstImage : 'https://pic3.zhimg.com/80/v2-abc532a979acb0411d0c2579c8ec92ee_hd.jpg'
}
,
 onLoad(){  
   this.getNews('gn',false, res => {
     res.data.result.forEach(obj => {
     this.formalInfo(obj)
      });    
     this.setData({
       hot: res.data.result[0],
       news: res.data.result.slice(1)
     })
   })
 }
,
onTapCat(e) {
    let id = String(e.currentTarget.dataset.no);
    this.getNews(id, false, res => {
      res.data.result.forEach(obj => { this.formalInfo(obj) })
      this.setData({
        hot: res.data.result[0],
        news: res.data.result.slice(1),
        id: id
      })
    })
    }
})