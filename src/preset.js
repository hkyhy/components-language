import React from 'react';
import { preset as fetchPreset } from '@kne/react-fetch';
import { Empty, Spin } from 'antd';
import axios from 'axios';
import { preset as remoteLoaderPreset } from '@kne/remote-loader';

window.PUBLIC_URL = process.env.PUBLIC_URL;

const componentsCoreRemote = {
  remote: 'components-core',
  url: 'https://registry.npmmirror.com',
  tpl: '{{url}}/@kne-components%2f{{remote}}/{{version}}/files/build',
  defaultVersion: '0.1.12'
};

remoteLoaderPreset({
  remotes: {
    default: componentsCoreRemote,
    'components-core': componentsCoreRemote,
    'components-iconfont': {
      remote: 'components-iconfont',
      url: 'https://registry.npmmirror.com',
      tpl: '{{url}}/@kne-components%2f{{remote}}/{{version}}/files/build',
      defaultVersion: '0.1.3'
    }
    /*'components-name': process.env.NODE_ENV === 'development' ? {
      remote: 'components-name', url: '/', tpl: '{{url}}'
    } : {
      remote: 'components-name',
      url: 'https://registry.npmmirror.com',
      tpl: '{{url}}/@kne-components%2f{{remote}}/{{version}}/files/build',
      defaultVersion: process.env.DEFAULT_VERSION
    }*/
  }
});

export const ajax = axios.create({
  validateStatus: function () {
    return true;
  }
});

fetchPreset({
  ajax,
  loading: <Spin delay={500} style={{ position: 'absolute', left: '50%', padding: '10px', transform: 'translateX(-50%)' }} />,
  error: null,
  empty: <Empty />,
  transformResponse: response => {
    const { data } = response;
    response.data = {
      code: data.code === 0 ? 200 : data.code,
      msg: data.msg,
      results: data.data
    };
    return response;
  }
});
