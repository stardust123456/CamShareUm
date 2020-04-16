export const request=(params)=>{
    return new Promise((resolve,reject)=>{
        wx.request({
            // 解构参数params,相当于解构轮播图api
            ...params,
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{
                reject(err)
            }
        });

    })
}