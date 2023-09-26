import { BonificationsType, ConfigType, DiscountsType, FamilyType, PersonalDataType } from "../Components/GlobalContext/GlobalContext"

function round(value: number, decimals: number = 2) {
  return +parseFloat(value.toString()).toFixed(decimals)
}

export const calculateHaberes = (Config: ConfigType, PersonalData: PersonalDataType[0], Bonifications: BonificationsType[0], baseSalary: number) : Array<{name: string, value: number}> => {
  const haberes = []
  const [startYear] = PersonalData.startDate.split('-')
  const today = new Date().getFullYear()
  // 1000 milis => seg , 86400 seg => dia , 365 dia => años
  const years = Math.floor(+today - +startYear)
  haberes.push({
    name: 'Salario base',
    value: round(baseSalary)
  })
  haberes.push({
    name: `Composicion Jerarquica (${Config.bonifications.chargeBonuses[Config.personalData.categorys.find((value) => (value.name == PersonalData.category))?.chargeBonus ?? '']?.name ?? ''})`,
    value: round(Config.bonifications.chargeBonuses[Config.personalData.categorys.find((value) => (value.name == PersonalData.category))?.chargeBonus ?? '']?.value ?? 0)
  })
  haberes.push({
    name: 'Antigüedad',
    value: round(Config.personalData.antiquity[years] * baseSalary/100)
  })
  haberes.push({
    name: 'Titulo',
    value: round((Config.personalData.title[PersonalData.title]?.value ?? 0 ) * baseSalary/100)
  })

  if (Bonifications.medDedication > 0) {
    haberes.push({
      name: 'Media Dedicacion',
      value: round(Bonifications.medDedication * baseSalary/100)
    })
  }
  
  const haberesFijos = Config.bonifications.fixedConcepts.map(({name, value}) => {
    return {
      name,
      value: round(Bonifications.fixedConcepts.find((value) => value.name === name)?.value ? +value : 0)
    }
  })
  
  const haberesProcentuales = Config.bonifications.proportionalConcepts.map(({name, value}) => {
    return {
      name,
      value: round(Bonifications.proportionalConcepts.find((value) => value.name === name)?.value ? value * baseSalary/100 : 0)
    }
  })
  
  haberes.push(...haberesFijos, ...haberesProcentuales)

  if (Bonifications.hsExtra > 0) {
    const hsExtra = haberes.reduce((acumulator, {value}) => (+acumulator + +value), 0)
    haberes.push({name: 'Horas Extra', value: round(hsExtra*1.5/(30 * 6.5))})
  }
  
  return haberes
  
}

export const calculateDiscounts = (Config: ConfigType, Discounts: DiscountsType[0], grossSalary: number) => {
  const discounts = []
  const fixedDiscounts = Config.discounts.fixedConcepts.map(({ name, value }) => {
    return {
      name,
      value: round(Discounts.fixedConcepts.find((value) => value.name === name)?.value ? +value : 0)
    }
  })

  const proportionalDiscounts = Config.discounts.proportionalConcepts.map(({ name, value }) => {
    return {
      name: `${name} (% ${value})`,
      value: round(Discounts.proportionalConcepts.find((value) => value.name === name)?.value ? value * grossSalary / 100 : 0)
    }
  })

  discounts.push(...fixedDiscounts, ...proportionalDiscounts)

  return discounts
}

const calculateFamilyBonifications = (Config: ConfigType, family: FamilyType[0], baseSalary: number) => {
  const familyResults = []

  const familyFixed = Config.family.fixedConcepts.map(({name, value}) => ({name, value: family.fixedConcepts.find((value) => value.name === name)?.value ? value : 0}))
  const familyProp = Config.family.proportionalConcepts.map(({name, value}) => ({name, value: family.proportionalConcepts.find((value) => value.name === name)?.value ? value * baseSalary / 100 : 0}))
  const familyAcc = Config.family.acumulativeConcepts.map(({name, value}) => ({
    name,
    value: family.acumulativeConcepts.find((value) => value.name === name)?.value ? value * (family.acumulativeConcepts.find((value) => value.name === name)?.value ?? 0): 0
  }))

  familyResults.push(...familyFixed, ...familyProp, ...familyAcc)

  return familyResults
}
export const calculateFinalData = (Config: ConfigType, personalData: PersonalDataType, Bonifications: BonificationsType, Discounts: DiscountsType, Family: FamilyType)
  : Array<{
    personalData: {
      lastName: string;
      firstName: string;
      charge: string;
      fechaIngreso: string;
      dni: number;
      category: string;
      antiguedad: string;
    },
    haberesYDescuentos: Array<{
      haber?: {
        name: string;
        value: number;
      };
      descuento?: {
        name: string;
        value: number
      }
    }>;
    totals: {
      subTotal: number;
      hTotal: number;
      dTotal: number;
      netTotal: number
    },
    family: Array<{ name: string, value: number }>
}> => {
  const finalData = personalData.map((data, index) => {
    const baseSalary = Config.personalData.categorys.find(({ name }) => data.category === name)?.baseSalary ?? 0

    const bonifications = calculateHaberes(Config, data, Bonifications[index], baseSalary)
    const subTotal= round(bonifications.reduce((acumulator, { value }) => (+acumulator + +value), 0))
    const discounts = calculateDiscounts(Config, Discounts[index], subTotal)
    const family = calculateFamilyBonifications(Config, Family[index], baseSalary)
    
    const haberesYDescuentos = bonifications.sort((a,b) => {
      if(a.value > b.value) return -1
      else if(a.value < b.value) return 1
      return 0
    }).map((haber, index) => ({
      haber: haber,
      descuento: discounts.sort((a, b) => {
        if (a.value > b.value) return -1
        else if (a.value < b.value) return 1
        return 0
      })[index]
    }));
    const {lastName, firstName, charge, startDate, dni, category} = data
    const [startYear, startMonth, startDay] = startDate.split('-')
    const date = new Date(+startYear, +startMonth, +startDay)
    const today = new Date().getTime()
    // 1000 milis => seg , 86400 seg => day , 365 day => year
    let years = (today - date.getTime()) / (1000 * 86400 * 365)
    let months = (years - Math.floor(years)) * 12
    let days = (months - Math.floor(months)) * 30
    years = Math.floor(years)
    months = Math.floor(months)
    days = Math.floor(days)
    const personalData = {
      lastName,
      firstName,
      charge,
      fechaIngreso: `${startDay} / ${startMonth} / ${startYear}`,
      dni,
      category,
      antiguedad: `${years} años, ${months} meses y ${days} dias`
    }

    const hTotal= round(subTotal + family.reduce((accumulator, {value}) => (+accumulator + +value), 0))
    const dTotal= round(discounts.reduce((acumulator, { value }) => (+acumulator + +value), 0))
    return {
      personalData,
      haberesYDescuentos,
      family,
      totals: {
        subTotal,
        hTotal,
        dTotal,
        netTotal: round(hTotal-dTotal)
      },
    }
  })
    
  return finalData 
}

export const validateFile = (array: Array<Array<any>>, Config: ConfigType): boolean => {
  const keys: {[key: string]: string} = {
    "Datos Personales": "personalData",
    "Bonificaciones": "bonifications",
    "Retenciones al Empleado": "discounts",
    "Asignaciones Familiares": "family",
  }

  // Keys Validation
  let isKeysValid = true
  array[0].forEach((tableValue: string) => {
    const valueInConfig = !!Object.keys(Config).some((configKey) => keys[tableValue] === configKey)
    if (!valueInConfig) {
      isKeysValid = false
    }
  })

  // Fields Length validation
  const tableKeysIndexes = array[0].map(({}, index: number) => index).filter((number) => {
    if (typeof number === 'number') return true
  })
  const isLengthValid = Object.keys(Config.personalData).length === tableKeysIndexes[1] - 3
  
  console.log(isLengthValid);
  
  return (isKeysValid && isLengthValid)
}