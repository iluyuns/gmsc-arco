// ID               int64            `json:"id" gorm:"primaryKey"`                               // 区域ID
// ParentID         int64            `json:"parent_id" gorm:"index"`                             // 父级ID
// Code             int64            `json:"code" gorm:"index"`                                  // 区域编码
// Deep             int64            `json:"deep" gorm:"index;enum:-1,-2,-3"`                    // 枚举 仅 -1: 大区, -2: 国家 -3: 总部 区域深度 0:省 1:市 2:区县 3:镇
// Name             string           `json:"name" gorm:"index"`                                  // 区域名称
// PhoneticSymbol   string           `json:"phonetic_symbol"`                                    // 拼音
// ExtName          string           `json:"ext_name"`                                           // 区域扩展名称
// RegionID         int64            `json:"region_id" gorm:"index"`                             // 大区ID
// IncludingRegions IncludingRegions `json:"including_regions" gorm:"serializer:json;type:json"` // 包含的区域

export interface AreaChina {
  id: number;
  parent_id: number;
  code: number;
  deep: number;
  name: string;
  phonetic_symbol: string;
  ext_name: string;
  region_id: number;
  including_regions: string[];
}
