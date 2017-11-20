const api = 'http://opendata.trudvsem.ru/api/v1'

const headers = {
  'Accept': 'application/json',
}

export const vacanciesTotal = () => 
    fetch(`${api}/vacancies`)
        .then(resp => resp.json())
        .then((data) =>  data.meta.total )

export const vacanciesByRegionTotal = (regionId) => 
    fetch(`${api}/vacancies/region/${regionId}`)
        .then(resp => resp.json())
        .then((data) => data.meta.total)

export const vacanciesByTextTotal = (text) => 
    fetch(`${api}/vacancies?text=${text}`)
        .then(resp => resp.json())
        .then((data) => data.meta.total)


export const vacanciesByTextRegionTotal = (regionId, text) =>
    fetch(`${api}/vacancies/region/${regionId}?text=${text}`)
        .then(resp => resp.json())
        .then((data) => data.meta.total)
