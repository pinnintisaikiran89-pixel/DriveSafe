import {

Bell,

Menu

} from "lucide-react";

function AppHeader({

title,

showNotification=true

}){

return(

<div className="sticky top-0 bg-white z-40 px-5 py-4 border-b">

<div className="flex justify-between items-center">

<div>

<h1 className="text-xl font-bold">

{title}

</h1>

</div>

<div className="flex items-center gap-4">

{

showNotification &&

<div className="relative">

<Bell/>

<div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500"/>

</div>

}

<Menu/>

</div>

</div>

</div>

);

}

export default AppHeader;