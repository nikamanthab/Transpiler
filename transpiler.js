(function(){

    var arr = [];
    function filternull(arr){
        var filtered = arr.filter(function (el) {
            return el != null;
          });
    
        return filtered;
    }
    
    function getOptions(row){
        row = filternull(row);
        var options = row.splice(2).filter((r)=>{
            return !String(r).match(/.jpg/);
        })
        options = options.map((ele)=>{
            //console.log(ele);
            if(ele[0]==="*"){
                return ele.split("*")[1];
            }
            else return ele;
        })
        return options;
    }
    
    function getAnswers(row){
        row = filternull(row);
        var ans = row.splice(2).map((a)=>{
            if(a[0]==="*")return 1;
            else return 0;
        });
        //console.log(ans);
        let ansres = [];
        for(let i=0;i<ans.length;i++){
            if(ans[i]===1)ansres.push(i);
        }
        return ansres;
    }
    
    function getImg(row){
        row = filternull(row);
        var img = row.splice(2).filter((r)=>{
            return String(r).match(/.jpg/);
        })
        return img;
    }
    
    function getAudio(row){
        row = filternull(row);
        var audio = row.splice(2).filter((r)=>{
            return String(r).match(/.mp3/);
        })
        return audio;
    }
    
    function genSection(rows){
        //console.log(rows);
        let input;
        rows.forEach(row => {
            if(row[1]===1){
                input="radio";
            }
            else if(row[1]===2){
                input="check";
            }
            else if(row[1]===3){
                input="input"
            }
    
            //pushing
            arr.push({
                input:input,
                question:row[0],
                options:getOptions(row),
                answer:getAnswers(row),
                image:getImg(row),
                audio:getAudio(row)
            });
        });
        
        return arr;
    }
    
        module.exports.genSection = genSection;
    })();
    
    