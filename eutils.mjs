// IO architecture of NCBI e-Utilities
//
// txt query --(eSearch)--> UIDs
// UIDs --(eSummary)--> record eSummary
// UIDs --(eFetch)--> full reccord
// UIDs in db A --(eLink)--> UIDs in db B
// UIDs --(ePost)--> temporary storage

async function eFetch(id='NM_000546',db='nuccore',retmode='text'){
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

async function getNucleotideSequence(id=1519245996,retmax=100,db='nuccore'){ // note change of parameter order between retmax and db
    if(id.match(/^[0-9]+$/)){ // catching numeric ids sent as strings
        id=parseInt(id)
    }
    if(typeof(id)=='string'){ // search term, such as "TP53 Homo sapiens"
        let ids= (await E.eSearch(id,db,retmax)).esearchresult.idlist
        return ids
    }else{  // a numeric id is provided
        return await E.eFetch(id,db)
    }
}

export{
    eFetch,
    eSearch,
    eInfo,
    eSummary,
    eLink,
    getNucleotideSequence
}

/*
Notes:

getting full sequence fr 

https://www.ncbi.nlm.nih.gov/sviewer/viewer.fcgi?id=399923581&db=nuccore&report=fasta&extrafeat=null&conwithfeat=on&hide-cdd=on&retmode=html&withmarkup=on&tool=portal&log$=seqview
sequence viewer: https://www.ncbi.nlm.nih.gov/tools/sviewer/manual-api/



# Example - fetching full TP53 sequences

ids = (await E.eSearch('TP53')).esearchresult.idlist    // by default db = 'nuccore'
seq = (await E.eFetch(ids[0])) // by default db='nucleotyde'

*/