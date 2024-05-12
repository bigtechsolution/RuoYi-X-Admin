import type { ValueEnumMap } from '@/constants';
import { sysDictDataGetType } from '@/services/system/System';
import { convertDict2ValueEnum } from '@/utils';
import { useQuery } from '@tanstack/react-query';

const useQueryDict = (dictType: string) => {
  return useQuery(
    ['global', 'dict', dictType],
    async () => {
      const dict = await sysDictDataGetType({ dictType });
      return convertDict2ValueEnum(dict);
    },
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  );
};

// sys_user_sex 用户性别
export const useQueryDictSysUserSex = () => {
  const { data } = useQueryDict('sys_user_sex');
  const defaultValueSysUserSex: string | null = data?.defaultValue ?? null;
  const valueEnumSysUserSex: ValueEnumMap<string> = data?.valueEnum ?? new Map();
  return {
    defaultValueSysUserSex,
    valueEnumSysUserSex,
  };
};

// sys_show_hide 菜单状态
export const useQueryDictSysShowHide = () => {
  const { data } = useQueryDict('sys_show_hide');
  const defaultValueSysShowHide: string | null = data?.defaultValue ?? null;
  const valueEnumSysShowHide: ValueEnumMap<string> = data?.valueEnum ?? new Map();
  return {
    defaultValueSysShowHide,
    valueEnumSysShowHide,
  };
};

// sys_normal_disable 系统开关
export const useQueryDictSysNormalDisable = () => {
  // const { data } = useQueryDict('sys_normal_disable');
  // const defaultValueSysNormalDisable: string | null = data?.defaultValue ?? null;
  // const valueEnumSysNormalDisable: ValueEnumMap<string> = data?.valueEnum ?? new Map();
  // return {
  //   defaultValueSysNormalDisable,
  //   valueEnumSysNormalDisable,
  // };
  return {defaultValueSysNormalDisable:null,valueEnumSysNormalDisable:null};
};

// sys_yes_no 系统是否
export const useQueryDictSysYesNo = () => {
  const { data } = useQueryDict('sys_yes_no');
  const defaultValueSysYesNo: string | null = data?.defaultValue ?? null;
  const valueEnumSysYesNo: ValueEnumMap<string> = data?.valueEnum ?? new Map();
  return {
    defaultValueSysYesNo,
    valueEnumSysYesNo,
  };
};

// sys_notice_type 通知类型
export const useQueryDictSysNoticeType = () => {
  const { data } = useQueryDict('sys_notice_type');
  const defaultValueSysNoticeType: string | null = data?.defaultValue ?? null;
  const valueEnumSysNoticeType: ValueEnumMap<string> = data?.valueEnum ?? new Map();
  return {
    defaultValueSysNoticeType,
    valueEnumSysNoticeType,
  };
};

// sys_notice_status 通知状态
export const useQueryDictSysNoticeStatus = () => {
  const { data } = useQueryDict('sys_notice_status');
  const defaultValueSysNoticeStatus: string | null = data?.defaultValue ?? null;
  const valueEnumSysNoticeStatus: ValueEnumMap<string> = data?.valueEnum ?? new Map();
  return {
    defaultValueSysNoticeStatus,
    valueEnumSysNoticeStatus,
  };
};

// sys_oper_type 操作类型
export const useQueryDictSysOperType = () => {
  const { data } = useQueryDict('sys_oper_type');
  const defaultValueSysOperType: string | null = data?.defaultValue ?? null;
  const valueEnumSysOperType: ValueEnumMap<string> = data?.valueEnum ?? new Map();
  return {
    defaultValueSysOperType,
    valueEnumSysOperType,
  };
};

// sys_common_result 系统结果
export const useQueryDictSysCommonResult = () => {
  const { data } = useQueryDict('sys_common_result');
  const defaultValueSysCommonResult: string | null = data?.defaultValue ?? null;
  const valueEnumSysCommonResult: ValueEnumMap<string> = data?.valueEnum ?? new Map();
  return {
    defaultValueSysCommonResult,
    valueEnumSysCommonResult,
  };
};

// sys_data_scope 数据权限范围
export const useQueryDictSysDataScope = () => {
  const { data } = useQueryDict('sys_data_scope');
  const defaultValueSysDataScope: string | null = data?.defaultValue ?? null;
  const valueEnumSysDataScope: ValueEnumMap<string> = data?.valueEnum ?? new Map();
  return {
    defaultValueSysDataScope,
    valueEnumSysDataScope,
  };
};

// sys_menu_type 菜单类型
export const useQueryDictSysMenuType = () => {
  const { data } = useQueryDict('sys_menu_type');
  const defaultValueSysMenuType: string | null = data?.defaultValue ?? null;
  const valueEnumSysMenuType: ValueEnumMap<string> = data?.valueEnum ?? new Map();
  return {
    defaultValueSysMenuType,
    valueEnumSysMenuType,
  };
};

// sys_gen_type 生成代码方式
export const useQueryDictSysGenType = () => {
  const { data } = useQueryDict('sys_gen_type');
  const defaultValueSysGenType: string | null = data?.defaultValue ?? null;
  const valueEnumSysGenType: ValueEnumMap<string> = data?.valueEnum ?? new Map();
  return {
    defaultValueSysGenType,
    valueEnumSysGenType,
  };
};

// sys_query_type 查询方式
export const useQueryDictSysQueryType = () => {
  const { data } = useQueryDict('sys_query_type');
  const defaultValueSysQueryType: string | null = data?.defaultValue ?? null;
  const valueEnumSysQueryType: ValueEnumMap<string> = data?.valueEnum ?? new Map();
  return {
    defaultValueSysQueryType,
    valueEnumSysQueryType,
  };
};

// sys_html_type HTML类型
export const useQueryDictSysHtmlType = () => {
  const { data } = useQueryDict('sys_html_type');
  const defaultValueSysHtmlType: string | null = data?.defaultValue ?? null;
  const valueEnumSysHtmlType: ValueEnumMap<string> = data?.valueEnum ?? new Map();
  return {
    defaultValueSysHtmlType,
    valueEnumSysHtmlType,
  };
};

// sys_tpl_category 生成模版类型
export const useQueryDictSysTplCategory = () => {
  const { data } = useQueryDict('sys_tpl_category');
  const defaultValueSysTplCategory: string | null = data?.defaultValue ?? null;
  const valueEnumSysTplCategory: ValueEnumMap<string> = data?.valueEnum ?? new Map();
  return {
    defaultValueSysTplCategory,
    valueEnumSysTplCategory,
  };
};

// sys_java_type JAVA类型
export const useQueryDictSysJavaType = () => {
  const { data } = useQueryDict('sys_java_type');
  const defaultValueSysJavaType: string | null = data?.defaultValue ?? null;
  const valueEnumSysJavaType: ValueEnumMap<string> = data?.valueEnum ?? new Map();
  return {
    defaultValueSysJavaType,
    valueEnumSysJavaType,
  };
};

// sys_access_policy 桶权限类型
export const useQueryDictSysAccessPolicy = () => {
  const { data } = useQueryDict('sys_access_policy');
  const defaultValueSysAccessPolicy: string | null = data?.defaultValue ?? null;
  const valueEnumSysAccessPolicy: ValueEnumMap<string> = data?.valueEnum ?? new Map();
  return {
    defaultValueSysAccessPolicy,
    valueEnumSysAccessPolicy,
  };
};

// sys_login_status 登录状态
export const useQueryDictSysLoginStatus = () => {
  const { data } = useQueryDict('sys_login_status');
  const defaultValueSysLoginStatus: string | null = data?.defaultValue ?? null;
  const valueEnumSysLoginStatus: ValueEnumMap<string> = data?.valueEnum ?? new Map();
  return {
    defaultValueSysLoginStatus,
    valueEnumSysLoginStatus,
  };
};

// sys_oper_status 操作状态
export const useQueryDictSysOperStatus = () => {
  const { data } = useQueryDict('sys_oper_status');
  const defaultValueSysOperStatus: string | null = data?.defaultValue ?? null;
  const valueEnumSysOperStatus: ValueEnumMap<string> = data?.valueEnum ?? new Map();
  return {
    defaultValueSysOperStatus,
    valueEnumSysOperStatus,
  };
};
export const cureTypeOptions = [
  { label: '언어치료', value: '언어치료' },
  { label: '놀이치료', value: '놀이치료' },
  { label: '감각통합치료', value: '감각통합치료' },
  { label: '인지학습치료', value: '인지학습치료' },
  { label: '작업치료', value: '작업치료' },
  { label: '물리운동치료', value: '물리운동치료' },
  { label: 'ABA치료', value: 'ABA치료' },
  { label: '음악치료', value: '음악치료' },
  { label: '미술치료', value: '미술치료' },
  { label: '특수체육', value: '특수체육' },
  { label: '특수교사', value: '특수교사' },
  { label: '모니터링', value: '모니터링' },
  { label: '임상심리', value: '임상심리' },
];
export const therapistStatusOptions = [
  { label: '언어치료', value: '언어치료' },
  { label: '놀이치료', value: '놀이치료' },
  { label: '감각통합치료', value: '감각통합치료' },
  { label: '인지학습치료', value: '인지학습치료' },
  { label: '작업치료', value: '작업치료' },
  { label: '물리운동치료', value: '물리운동치료' },
  { label: 'ABA치료', value: 'ABA치료' },
  { label: '음악치료', value: '음악치료' },
  { label: '미술치료', value: '미술치료' },
  { label: '특수체육', value: '특수체육' },
  { label: '특수교사', value: '특수교사' },
  { label: '모니터링', value: '모니터링' },
  { label: '임상심리', value: '임상심리' },
];
export enum TherapistStatusEnums {
  "등록진행중" = "등록진행중",
  "검토중" = "검토중",
  "등록유보" = "등록유보",
  "등록완료" = "등록완료",
}
export interface KoDistrict {
  name: string;
  label?: string;
  code: string;
  children?: KoDistrict[];
}

export interface RegionModel {
  largeCode: string;
  largeText: string;
  mediumCode?: string;
  mediumText?: string;
}

export const koreaRegions: KoDistrict[] = [
  {
    code: '11',
    name: '서울특별시',
    label: '서울',
    children: [
      { code: '11110', name: '종로구' },
      { code: '11140', name: '중구' },
      { code: '11170', name: '용산구' },
      { code: '11200', name: '성동구' },
      { code: '11215', name: '광진구' },
      { code: '11230', name: '동대문구' },
      { code: '11260', name: '중랑구' },
      { code: '11290', name: '성북구' },
      { code: '11305', name: '강북구' },
      { code: '11320', name: '도봉구' },
      { code: '11350', name: '노원구' },
      { code: '11380', name: '은평구' },
      { code: '11410', name: '서대문구' },
      { code: '11440', name: '마포구' },
      { code: '11470', name: '양천구' },
      { code: '11500', name: '강서구' },
      { code: '11530', name: '구로구' },
      { code: '11545', name: '금천구' },
      { code: '11560', name: '영등포구' },
      { code: '11590', name: '동작구' },
      { code: '11620', name: '관악구' },
      { code: '11650', name: '서초구' },
      { code: '11680', name: '강남구' },
      { code: '11710', name: '송파구' },
      { code: '11740', name: '강동구' },
    ],
  },
  {
    code: '26',
    name: '부산광역시',
    label: '부산',
    children: [
      { code: '26110', name: '중구' },
      { code: '26140', name: '서구' },
      { code: '26170', name: '동구' },
      { code: '26200', name: '영도구' },
      { code: '26230', name: '부산진구' },
      { code: '26260', name: '동래구' },
      { code: '26290', name: '남구' },
      { code: '26320', name: '북구' },
      { code: '26350', name: '해운대구' },
      { code: '26380', name: '사하구' },
      { code: '26410', name: '금정구' },
      { code: '26440', name: '강서구' },
      { code: '26470', name: '연제구' },
      { code: '26500', name: '수영구' },
      { code: '26530', name: '사상구' },
      { code: '26710', name: '기장군' },
    ],
  },
  {
    code: '27',
    name: '대구광역시',
    label: '대구',
    children: [
      { code: '27110', name: '중구' },
      { code: '27140', name: '동구' },
      { code: '27170', name: '서구' },
      { code: '27200', name: '남구' },
      { code: '27230', name: '북구' },
      { code: '27260', name: '수성구' },
      { code: '27290', name: '달서구' },
      { code: '27710', name: '달성군' },
      { code: '27720', name: '군위군' },
    ],
  },
  {
    code: '28',
    name: '인천광역시',
    label: '인천',
    children: [
      { code: '28110', name: '중구' },
      { code: '28114', name: '중구영종출장소' },
      { code: '28118', name: '중구용유출장소' },
      { code: '28140', name: '동구' },
      { code: '28177', name: '미추홀구' },
      { code: '28185', name: '연수구' },
      { code: '28200', name: '남동구' },
      { code: '28237', name: '부평구' },
      { code: '28245', name: '계양구' },
      { code: '28260', name: '서구' },
      { code: '28265', name: '서구검단출장소' },
      { code: '28710', name: '강화군' },
      { code: '28720', name: '옹진군' },
    ],
  },
  {
    code: '29',
    name: '광주광역시',
    label: '광주',
    children: [
      { code: '29110', name: '동구' },
      { code: '29140', name: '서구' },
      { code: '29155', name: '남구' },
      { code: '29170', name: '북구' },
      { code: '29200', name: '광산구' },
    ],
  },
  {
    code: '30',
    name: '대전광역시',
    label: '대전',
    children: [
      { code: '30110', name: '동구' },
      { code: '30140', name: '중구' },
      { code: '30170', name: '서구' },
      { code: '30200', name: '유성구' },
      { code: '30230', name: '대덕구' },
    ],
  },
  {
    code: '31',
    name: '울산광역시',
    label: '울산',
    children: [
      { code: '31110', name: '중구' },
      { code: '31140', name: '남구' },
      { code: '31170', name: '동구' },
      { code: '31200', name: '북구' },
      { code: '31710', name: '울주군' },
    ],
  },
  {
    code: '43',
    name: '충청북도',
    label: '충청북도',
    children: [
      { code: '43110', name: '청주시' },
      { code: '43111', name: '청주시 상당구' },
      { code: '43112', name: '청주시 서원구' },
      { code: '43113', name: '청주시 흥덕구' },
      { code: '43114', name: '청주시 청원구' },
      { code: '43130', name: '충주시' },
      { code: '43150', name: '제천시' },
      { code: '43720', name: '보은군' },
      { code: '43730', name: '옥천군' },
      { code: '43740', name: '영동군' },
      { code: '43745', name: '증평군' },
      { code: '43750', name: '진천군' },
      { code: '43760', name: '괴산군' },
      { code: '43770', name: '음성군' },
      { code: '43800', name: '단양군' },
    ],
  },
  {
    code: '44',
    name: '충청남도',
    label: '충청남도',
    children: [
      { code: '44130', name: '천안시' },
      { code: '44131', name: '천안시 동남구' },
      { code: '44133', name: '천안시 서북구' },
      { code: '44150', name: '공주시' },
      { code: '44180', name: '보령시' },
      { code: '44200', name: '아산시' },
      { code: '44210', name: '서산시' },
      { code: '44230', name: '논산시' },
      { code: '44250', name: '계룡시' },
      { code: '44270', name: '당진시' },
      { code: '44710', name: '금산군' },
      { code: '44760', name: '부여군' },
      { code: '44770', name: '서천군' },
      { code: '44790', name: '청양군' },
      { code: '44800', name: '홍성군' },
      { code: '44810', name: '예산군' },
      { code: '44825', name: '태안군' },
    ],
  },
  {
    code: '46',
    name: '전라남도',
    label: '전라남도',
    children: [
      { code: '46110', name: '목포시' },
      { code: '46130', name: '여수시' },
      { code: '46150', name: '순천시' },
      { code: '46170', name: '나주시' },
      { code: '46230', name: '광양시' },
      { code: '46710', name: '담양군' },
      { code: '46720', name: '곡성군' },
      { code: '46730', name: '구례군' },
      { code: '46770', name: '고흥군' },
      { code: '46780', name: '보성군' },
      { code: '46790', name: '화순군' },
      { code: '46800', name: '장흥군' },
      { code: '46810', name: '강진군' },
      { code: '46820', name: '해남군' },
      { code: '46830', name: '영암군' },
      { code: '46840', name: '무안군' },
      { code: '46860', name: '함평군' },
      { code: '46870', name: '영광군' },
      { code: '46880', name: '장성군' },
      { code: '46890', name: '완도군' },
      { code: '46900', name: '진도군' },
      { code: '46910', name: '신안군' },
    ],
  },
  {
    code: '47',
    name: '경상북도',
    label: '경상북도',
    children: [
      { code: '47110', name: '포항시' },
      { code: '47111', name: '포항시 남구' },
      { code: '47113', name: '포항시 북구' },
      { code: '47130', name: '경주시' },
      { code: '47150', name: '김천시' },
      { code: '47170', name: '안동시' },
      { code: '47190', name: '구미시' },
      { code: '47210', name: '영주시' },
      { code: '47230', name: '영천시' },
      { code: '47250', name: '상주시' },
      { code: '47280', name: '문경시' },
      { code: '47290', name: '경산시' },
      { code: '47730', name: '의성군' },
      { code: '47750', name: '청송군' },
      { code: '47760', name: '영양군' },
      { code: '47770', name: '영덕군' },
      { code: '47820', name: '청도군' },
      { code: '47830', name: '고령군' },
      { code: '47840', name: '성주군' },
      { code: '47850', name: '칠곡군' },
      { code: '47900', name: '예천군' },
      { code: '47920', name: '봉화군' },
      { code: '47930', name: '울진군' },
      { code: '47940', name: '울릉군' },
    ],
  },
  {
    code: '48',
    name: '경상남도',
    label: '경상남도',
    children: [
      { code: '48120', name: '창원시' },
      { code: '48121', name: '창원시 의창구' },
      { code: '48123', name: '창원시 성산구' },
      { code: '48125', name: '창원시 마산합포구' },
      { code: '48127', name: '창원시 마산회원구' },
      { code: '48129', name: '창원시 진해구' },
      { code: '48170', name: '진주시' },
      { code: '48220', name: '통영시' },
      { code: '48240', name: '사천시' },
      { code: '48245', name: '사천남양출장소' },
      { code: '48250', name: '김해시' },
      { code: '48252', name: '장유출장소' },
      { code: '48270', name: '밀양시' },
      { code: '48310', name: '거제시' },
      { code: '48330', name: '양산시' },
      { code: '48332', name: '양산시웅상출장소' },
      { code: '48720', name: '의령군' },
      { code: '48730', name: '함안군' },
      { code: '48740', name: '창녕군' },
      { code: '48820', name: '고성군' },
      { code: '48840', name: '남해군' },
      { code: '48850', name: '하동군' },
      { code: '48860', name: '산청군' },
      { code: '48870', name: '함양군' },
      { code: '48880', name: '거창군' },
      { code: '48890', name: '합천군' },
    ],
  },
  {
    code: '50',
    name: '제주특별자치도',
    label: '제주특별자치도',
    children: [
      { code: '50110', name: '제주시' },
      { code: '50130', name: '서귀포시' },
    ],
  },
  {
    code: '52',
    name: '전북특별자치도',
    label: '전북특별자치도',
    children: [
      { code: '52110', name: '전주시' },
      { code: '52111', name: '전주시 완산구' },
      { code: '52113', name: '전주시 덕진구' },
      { code: '52130', name: '군산시' },
      { code: '52140', name: '익산시' },
      { code: '52180', name: '정읍시' },
      { code: '52190', name: '남원시' },
      { code: '52210', name: '김제시' },
      { code: '52710', name: '완주군' },
      { code: '52720', name: '진안군' },
      { code: '52730', name: '무주군' },
      { code: '52740', name: '장수군' },
      { code: '52750', name: '임실군' },
      { code: '52770', name: '순창군' },
      { code: '52790', name: '고창군' },
      { code: '52800', name: '부안군' },
    ],
  },
];
export const banks = [
  { label: '경남은행', value: '경남은행' },
  { label: '광주은행', value: '광주은행' },
  { label: 'KB국민은행', value: 'KB국민은행' },
  { label: 'IBK기업은행', value: 'IBK기업은행' },
  { label: 'NH농협은행', value: 'NH농협은행' },
  { label: 'DGB대구은행', value: 'DGB대구은행' },
  { label: '부산은행', value: '부산은행' },
  { label: '새마을금고', value: '새마을금고' },
  { label: 'Sh수협은행', value: 'Sh수협은행' },
  { label: '신한은행', value: '신한은행' },
  { label: '우리은행', value: '우리은행' },
  { label: '우체국예금보험', value: '우체국예금보험' },
  { label: '전북은행', value: '전북은행' },
  { label: '하나은행', value: '하나은행' },
];
