/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var App = require('app');

App.AddServiceView = Em.View.extend({

  templateName: require('templates/main/service/add'),

  isStep1Disabled: function () {
    return this.isStepDisabled(1);
  }.property('controller.isStepDisabled.@each.value').cacheable(),

  isStep2Disabled: function () {
    return this.isStepDisabled(2);
  }.property('controller.isStepDisabled.@each.value').cacheable(),

  isStep3Disabled: function () {
    return this.isStepDisabled(3);
  }.property('controller.isStepDisabled.@each.value').cacheable(),

  isStep4Disabled: function () {
    return this.isStepDisabled(4);
  }.property('controller.isStepDisabled.@each.value').cacheable(),

  isStep5Disabled: function () {
    return this.isStepDisabled(5);
  }.property('controller.isStepDisabled.@each.value').cacheable(),

  isStep6Disabled: function () {
    return this.isStepDisabled(6);
  }.property('controller.isStepDisabled.@each.value').cacheable(),

  isStep7Disabled: function () {
    return this.isStepDisabled(7);
  }.property('controller.isStepDisabled.@each.value').cacheable(),

  isStepDisabled: function (index) {
    return this.get('controller.isStepDisabled').findProperty('step', index).get('value');
  },

  didInsertElement: function () {
    App.ajax.send({
      name: 'hosts.confirmed',
      sender: this,
      data: {
        clusterName: App.get('clusterName')
      },
      success: 'loadConfirmedHostsSuccessCallback'
    });
  },

  loadConfirmedHostsSuccessCallback: function (response) {
    var hosts = {};
    response.items.mapProperty('Hosts').forEach(function(item){
      hosts[item.host_name] = {
        name: item.host_name,
        cpu: item.cpu_count,
        memory: item.total_mem,
        disk_info: item.disk_info,
        bootStatus: "REGISTERED",
        isInstalled: true
      };
    });
    this.get('controller').setDBProperty('hosts', hosts);
  }

});
