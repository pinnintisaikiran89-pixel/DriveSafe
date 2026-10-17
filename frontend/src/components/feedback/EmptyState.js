import {

    MapPin

} from "lucide-react";

function EmptyState({

    title,

    subtitle

}){

return(

<div className="

text-center

py-16

">

<MapPin

size={45}

className="

mx-auto

text-slate-400

"

/>

<h2 className="

text-xl

font-bold

mt-4

">

{title}

</h2>

<p className="

text-slate-500

mt-2

">

{subtitle}

</p>

</div>

);

}

export default EmptyState;