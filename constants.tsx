
import { Recipe } from './types';

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: '1',
    name: '红烧肉',
    categories: ['热菜', '粤菜'],
    tags: ['家常', '经典'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3FhVVS_lpZi2alHKIUaKEgObf9ZE5pDMof4VVSAvUK98BlgTqLMztolUY97RauSqZxlA0uYaYkPeKpCg-Eyqz-ogFyJAAo-RW4WAQ2XWQjjx-okRegnB9B99elfC1XdkBPPxVKG3AHMhyTLdoQXTS5FNKMANaEvzhAZfnMz25g5fBSbq663NhD5iDMF6-vS0IuvOT1R8CQvVr6G1zdS5gVVGpswNZXhjHnfnUhUiqJnk4jH7Sq3wsXWcPHBHcp6uDXRDwDhzFWbZj',
    date: '2023/10/27',
    ingredients: [
      { name: '五花肉', amount: '500g' },
      { name: '生抽', amount: '2勺' },
      { name: '老抽', amount: '1勺' },
      { name: '冰糖', amount: '8-10粒' },
    ],
    steps: [
      { description: '将五花肉洗净切成2厘米左右见方的块。冷水下锅，放入姜片和料酒，焯水煮出血沫后捞出沥干备用。' },
      { description: '炒锅放入少量油，下入冰糖小火炒出糖色。倒入肉块均匀裹上糖色，煸炒至肉块边缘微黄出油。' },
      { description: '加入生抽、老抽翻炒均匀。倒入没过肉块的热水，放入八角、桂皮。大火烧开后转小火焖煮45-60分钟。' },
      { description: '最后大火收汁，待汤汁浓稠红亮即可出锅装盘。' },
    ],
    chefNote: '奶奶的小秘诀：炒糖色的时候一定要用小火，不然容易发苦。焯水后捞出的肉块千万不要用冷水冲洗，否则肉质会迅速收缩变柴，用温水或者热水洗净。'
  },
  {
    id: '2',
    name: '清蒸鲈鱼',
    categories: ['热菜', '粤菜'],
    tags: ['清淡', '健康'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmJ7EKyuNmax5irT2q-cmGzPHRqj348zLNscHHal4JDvT7ro_EgGBtyGkwjttbP7FPJGLJlx9U-6nDhMP_F_CSbo-xLA57S_8D8S9jPQR5QcF2wIL3IoNkJM3D4sb_N9WvVmuuF8fhZGs8jq-qfxa3kDml7sPvqQSfEReiGSKmMQznlusFn2kOj_mmXirSNEioJ8hdSH3Lso7ITH45OczbBwn3d0OF-vkaowLJxN6LnRv6iaKZ_YrtCKJ06mZvV1iDYYwfj5y_MLAo',
    date: '2023/10/25',
    ingredients: [
      { name: '鲈鱼', amount: '1条' },
      { name: '大葱', amount: '1根' },
      { name: '姜', amount: '1块' },
      { name: '蒸鱼豉油', amount: '3勺' },
    ],
    steps: [
      { description: '鱼身切花刀，塞入姜片，大火蒸8分钟。' },
      { description: '倒掉盘中多余水分，铺上葱丝。' },
      { description: '淋上热油激发出香味，最后倒入蒸鱼豉油即可。' },
    ],
  },
  {
    id: '3',
    name: '地三鲜',
    categories: ['热菜'],
    tags: ['东北菜', '下饭'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjg7suNFJXtIG7EGlh909TRQXP4z4iYoLpHZWUI535W06UwWnbYzLb_NnGaPgmFLIhLHwDWcRxjj-b_giyJQ38FEdcNeyWOQl6koa7oRpuyK792gmEByD1xvbfsDdylgZDvvTYTkJyieHXHi2OOjS2u__l-Wqc4V0HgxwAWEwa36FqSrUU6H8xy1s_4a58-wTdpeUjx0K8ANGp9FyOGTYuc64QNpdL2D8ODYI-DmwTsi6pSoJ82x70y91_HEkvg700yUoe0XQOk_rl',
    date: '2023/10/24',
    ingredients: [
      { name: '土豆', amount: '2个' },
      { name: '茄子', amount: '1个' },
      { name: '青椒', amount: '1个' },
    ],
    steps: [
      { description: '食材切块。' },
      { description: '下锅炸至微焦。' },
      { description: '调酱汁勾芡翻炒。' },
    ]
  },
  {
    id: '4',
    name: '爽口拍黄瓜',
    categories: ['凉菜'],
    tags: ['清脆解腻', '蒜香'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdb_EN0IO5unwNO4AHcelcC0SUVTOju96nMuaC-60x1nb-1HcwaU9Hnrmx6gX6IOzsK7RVWprnxZzaCYB7Aidx615wVNj8PWlDrFBNIxMCwlLiA8UBpoh9QaVsLosoqzAukqZuMMTTUTY9UDx0Asz3leqWuwlgSrxYGWhuXLQNT1tzsyG0tutOqgYIjfV0tidrJ4tRnxWtocI_SNQmlPrfTfYR2luYEpWPKGaZDe0lDO4alNOEkrfszHnrVjui_8bA0G1TyTEDyIr6',
    date: '2023/10/28',
    ingredients: [{name: '黄瓜', amount: '2根'}],
    steps: [{description: '拍碎切段，加蒜泥、醋、生抽、香油拌匀。'}]
  },
  {
    id: '5',
    name: '麻辣口水鸡',
    categories: ['凉菜', '川菜'],
    tags: ['鲜嫩多汁', '招牌'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOgYoZHugEoMfxSG_e1H9dXlZpJ8Ky_em2dnDszoxCoTqIKzwvStQDnRIMiwVj7pSrKNj98r_DM8eN8vvhevTddj29lsKDrnLAXtmEagThwQx9qyZ1SpuGCa9oBVTtuEjtG2vsd_be7YPewR6SJcSbXJf31EG9IpLy89IpfRntPIujAGXsdKo8U2d3r1feeKPbsvrUmB-tXJxGwiUUI9uwksINli0EZNWqBvX44Kas0b2WJXtXxoc8V3kNLVaEegVNWgMLopfo4CAO',
    date: '2023/10/28',
    ingredients: [{name: '三黄鸡', amount: '半只'}],
    steps: [{description: '煮熟浸冰水，切块淋上特制红油。'}]
  }
];

export const CATEGORIES = ['凉菜', '热菜', '主食', '甜品', '汤羹', '川菜', '粤菜', '淮扬菜', '意大利', '法餐', '东南亚', '西餐'];

export const CATEGORY_GROUPS = [
  ['凉菜', '热菜', '主食', '甜品', '汤羹'],
  ['川菜', '粤菜', '淮扬菜'],
  ['意大利', '法餐', '东南亚', '西餐']
];
