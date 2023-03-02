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

import router from '@system.router';
import storage from '@system.storage';
import prompt from '@system.prompt';
import {HAEventType, HAParamType, HAReportPolicy, HAUserProfileType} from '@hw-hmscore/analytics-sdk-harmony/index.harmony_types';

const ALL_QUESTIONS = 5;

export default {
    data: {
        currentNumber: 0,
        score: 0,
        answers: [true, true, false, false, true],
        questions: [
                'The largest planet in the solar system is Jupiter',
                'The first Olympic Games were held in Athens, Greece',
                'The violin has 6 strings',
                'Flying bats belong to birds',
                'Sound spreads faster in the water than in the air'
        ],
        userAnswers: [],
        answerFinished: false
    },

    onLoad() {
        this.$set('userAnswers', new Array(ALL_QUESTIONS));
    },

    goNext() {
        this.$set('currentNumber', this.currentNumber + 1);
        this.$set('answerFinished', this.currentNumber >= ALL_QUESTIONS);
    },

    checkAnswer(answer) {
        answer = answer.currentTarget.attr.dataAnswer;
        if (answer === this.answers[this.currentNumber]) {
            this.$set('score', this.score + 100 / ALL_QUESTIONS);
        }
        let userAnswers = this.userAnswers;
        userAnswers[this.currentNumber] = answer ? '1' : '0';
        this.$set('userAnswers', userAnswers);
        this.reportAnswer(answer);
        this.goNext();
    },

    formatDate() {
        return new Date().toISOString();
    },

    reportAnswer(answer) {
        let answerTime = this.formatDate();
        let reportMessage = {
            question: this.questions[this.currentNumber],
            answer: answer,
            answerTime: answerTime
        }
        this.$app.$def.globalData.analytics.onEvent("Answer", reportMessage);
    },

    showSettingMenu() {
        router.push({
            uri: 'pages/setting/setting'
        })
    },

    postScore() {
        let scoreMessage = {}
        scoreMessage[HAParamType.SCORE] = this.score;
        this.$app.$def.globalData.analytics.onEvent(HAEventType.SUBMITSCORE, scoreMessage);

        // TODO Report score by using SUBMITSCORE Event
        let scoreResult = {
            answers: this.answers,
            questions: this.questions,
            score: this.score,
            userAnswers: this.userAnswers
        }
        this.$app.$def.globalData.scoreResult = scoreResult;

        router.push({
            uri: 'pages/result/result'
        })
    }
}
