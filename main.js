// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

//http://mr3.doubanio.com/6af894b25fcb54776124bf30e40b5c6e/1/fm/song/p1815436_128k.mp4

var urlPatterns = ["http://yinyueshiting.baidu.com/*mp3*",
                   "http://*.doubanio.com/*.mp4"]

function downloadUrl(url){
    //search download list if it is has been downloaded.
    chrome.downloads.search({"url": url}, function(arrays){
        if (arrays.length == 0){
            console.log("initialize downloading")
            chrome.downloads.download({
                "url": url,
                "conflictAction": "overwrite",
            }, function(){
                console.log("downloaded: " + url);
            });
        }
    })
}

document.addEventListener('DOMContentLoaded', function() {
    chrome.webRequest.onResponseStarted.addListener(
        function(details) {
            let url = details.url
            downloadUrl(url);
        },
        {urls: urlPatterns},
        []
    );
});
