// IO architecture of NCBI e-Utilities
//
// txt query --(eSearch)--> UIDs
// UIDs --(eSummary)--> record eSummary
// UIDs --(eFetch)--> full reccord
// UIDs in db A --(eLink)--> UIDs in db B
// UIDs --(ePost)--> temporary storage

async function eFetch(id='NM_000546',db='nucleotide',retmode='text'){
    let seq = await (await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=${db}&id=${id}&rettype=fasta&retmode=${retmode}`))[`${retmode}`]()
    let seqLines = seq.split(/\n/)
    console.log(seqLines[0])
    return seqLines.slice(1).join('')
}

async function eSearch(term='TP53',db='nuccore',retmax=100){
    return await (await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=${db}&term=${term}&retmax=${retmax}&retmode=json`)).json()
}

async function eInfo(db=''){ // empty query will return list
    return await (await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/einfo.fcgi?db=${db}&retmode=json`)).json()
}

async function eSummary(id='2606992112',db='nuccore'){ // summary for UID
    return await (await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=${db}&id=${id}&retmode=json`)).json()
}

async function eLink(id='2606992112',db='nuccore'){ // summary for UID
    return await (await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/elink.fcgi?db=${db}&id=${id}&retmode=json`)).json()
}

export{
    eFetch,
    eSearch,
    eInfo,
    eSummary,
    eLink
}