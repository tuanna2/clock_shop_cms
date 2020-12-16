// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
import { BasicListItemDataType } from './data.d';

const titles = [
  'Girard Perregaux 49805-11-254-BA6A',
  'Arnold & Son Royal Collection True Moon 1TMAS.U03A.C42B',
  'Corum Bridges Golden Bridge 113.165.55/0002 GL10R',
  'Franck Muller V32 Full Diamond – Hồng',
  'Bootstrap',
  'React',
  'Vue',
  'Webpack',
];
const avatars = [
  'http://romanwatch.vn/wp-content/uploads/2020/12/600-300x300.jpg',
  'http://romanwatch.vn/wp-content/uploads/2020/12/TM_ST_1TMAS_U03A_C42B_Soldat.jpg',
  'http://romanwatch.vn/wp-content/uploads/2020/12/vsm1403145468-276x300.jpg',
  'http://romanwatch.vn/wp-content/uploads/2020/12/v32-h%E1%BB%93ng-e1607075519779-300x300.jpg',
  'http://romanwatch.vn/wp-content/uploads/2020/12/v32-tr%E1%BA%AFng-e1607075143674-300x169.jpg',
  'http://romanwatch.vn/wp-content/uploads/2020/12/v32-%C4%91%E1%BB%8F-e1607074824316-300x300.jpg',
  'http://romanwatch.vn/wp-content/uploads/2020/12/v32-%C4%91en-1-e1607074513645-300x300.jpg',
  'http://romanwatch.vn/wp-content/uploads/2020/11/2739_1-300x300.png',
];

const covers = [
  'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
];
const desc = [
  'lorem ipsum',
  'lorem ipsum',
  'lorem ipsum',
  'lorem ipsum',
  'lorem ipsum',
];

const trademark = [
  'apple',
  'apple',
  'apple',
  'apple',
  'apple',
  'apple',
  'apple',
  'apple',
  'apple',
  'apple',
];

function fakeList(count: number): BasicListItemDataType[] {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      id: `fake-list-${i}`,
      trademark: trademark[i % 10],
      name: titles[i % 8],
      avatar: avatars[i % 8],
      cover: parseInt(`${i / 4}`, 10) % 2 === 0 ? covers[i % 4] : covers[3 - (i % 4)],
      status: ['active', 'exception', 'normal'][i % 3] as
        | 'normal'
        | 'exception'
        | 'active'
        | 'success',
      percent: Math.ceil(Math.random() * 50) + 50,
      logo: avatars[i % 8],
      href: 'https://ant.design',
      updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).getTime(),
      createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).getTime(),
      subDescription: desc[i % 5],
      description:
        '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
      activeUser: Math.ceil(Math.random() * 100000) + 100000,
      newUser: Math.ceil(Math.random() * 1000) + 1000,
      star: Math.ceil(Math.random() * 100) + 100,
      like: Math.ceil(Math.random() * 100) + 100,
      message: Math.ceil(Math.random() * 10) + 10,
      content:
        '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
      members: [
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
          name: '曲丽丽',
          id: 'member1',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
          name: '王昭君',
          id: 'member2',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
          name: '董娜娜',
          id: 'member3',
        },
      ],
    });
  }
  return list;
}

let sourceData: BasicListItemDataType[] = [];

function getFakeList(req: Request, res: Response) {
  const params = req.query;

  const count = params.count * 1 || 20;

  const result = fakeList(count);
  sourceData = result;
  return res.json(result);
}

function postFakeList(req: Request, res: Response) {
  const { /* url = '', */ body } = req;
  // const params = getUrlParams(url);
  const { method, id } = body;
  // const count = (params.count * 1) || 20;
  let result = sourceData || [];

  switch (method) {
    case 'delete':
      result = result.filter((item) => item.id !== id);
      break;
    case 'update':
      result.forEach((item, i) => {
        if (item.id === id) {
          result[i] = { ...item, ...body };
        }
      });
      break;
    case 'post':
      result.unshift({
        ...body,
        id: `fake-list-${result.length}`,
        createdAt: new Date().getTime(),
      });
      break;
    default:
      break;
  }

  return res.json(result);
}

export default {
  'GET  /api/fake_list': getFakeList,
  'POST  /api/fake_list': postFakeList,
};
