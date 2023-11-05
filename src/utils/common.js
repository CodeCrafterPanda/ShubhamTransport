// Function to compare minor version of applications.
export function minorVersionCompare(currentVersion, storeVersion){
    try{
        let result = false;
        let tempVersion1, tempVersion2;
        tempVersion1=currentVersion?.toString()?.split('.');
        tempVersion2=storeVersion?.toString()?.split('.');
        
        for(let i = 0; i<(Math.max(tempVersion1.length,tempVersion2.length));i++){
            if(tempVersion1[i]==undefined){ tempVersion1[i]=0; }
            if(tempVersion2[i]==undefined){ tempVersion2[i]=0; }

            if((i === 0 || i === 1) && (Number(tempVersion1[i])<Number(tempVersion2[i]))){
                result=true;
                break;
            }
            }
        return(result);
    } catch ( e ) {
        console.log(e);
    }
    
}