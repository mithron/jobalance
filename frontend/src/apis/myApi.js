const api = 'http://bighack-mithron.c9users.io/api/v0'

export const cvTotal = () => 
    fetch((`${api}/simplecv/`))
        .then(resp => resp.json())
        .then((data) => data.count)

export const cvByRegionTotal = (regionId) => 
    fetch((`${api}/simplecv/${regionId}/`))
        .then(resp => resp.json())
        .then((data) => data.count)
        
export const cvByTextTotal = (text) => 
    fetch((`${api}/simplecv/${text}/`))
        .then(resp => resp.json())
        .then((data) => data.count)

export const cvByTextRegionTotal = (regionId, text) => 
    fetch((`${api}/simplecv/${regionId}/${text}/`))
        .then(resp => resp.json())
        .then((data) => data.count)