Page({
  data:{
  newscat:[{
    id:'gn',
    text:'国内'},
    {id:'gj',
    text:'国际'},
    {id:'cj',
    text:'财经'},
    {id:'yl',
    text:'娱乐'},
    {id:'js',
    text:'技术'},
    {id:'ty',
    text:'体育'},
    {id:'other',
    text:'其他'}
  ] ,
  id:'gn'
},
getNews(cat,callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: cat
      },
      success: res => {
        res.data.result.forEach(obj => { obj.date = obj.date.slice(0, 10) + ' ' + obj.date.slice         (11, 19) })
        this.setData({
          hot: res.data.result[0],
          news: res.data.result.slice(1)
        })
      },
      complete: () => {
        callback && callback()
      }
    })
  }
  ,

  onTapNews(e) {
    let id = String(e.currentTarget.dataset.no)
   
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })

  }
,
onPullDownRefresh(){
  this.getNews(this.data.id,() => {
     wx.stopPullDownRefresh()
  })
}
 ,
 onLoad(){
  this.getNews('gn')
 }
,
onTapCat(e) {
    let id = String(e.currentTarget.dataset.no)
   
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: id
      },
      success: res => {
        res.data.result.forEach(obj => { obj.date = obj.date.slice(0, 10) + ' ' + obj.date.slice         (11, 19) })
        this.setData({
          hot: res.data.result[0],
          news: res.data.result.slice(1),
          id:id
        })
      }
    })
}
})


