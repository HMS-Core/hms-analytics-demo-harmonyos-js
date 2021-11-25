/*
 * Copyright 2021. Huawei Technologies Co., Ltd. All rights reserved.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

import analytics from '@hmscore/analytics-sdk-harmony';

export default {
    globalData: {
        scoreResult: null,
        HaAliRequest: [],
        HaAliConsole: [],
        analytics: null,
        agconnect: null,
        onHaAnalyticsRequest: null
    },

    initAGConnectJSB: function () {
        let bundlename = 'com.huawei.hms.analytics.harmonyosdemo'; // 当前包的bundlename
        analytics.getInstance(bundlename);

        this.globalData.analytics = analytics
    },
    onCreate() {
        console.info('AceApplication onCreate');
        this.initAGConnectJSB()
    },
    onDestroy() {
        console.info('AceApplication onDestroy');
    }
};
