function InputField({

label,

type="text",

placeholder,

value,

onChange,

icon

}){

return(

<div>

{

label &&

<label className="block mb-2 font-medium">

{label}

</label>

}

<div className="flex items-center bg-slate-100 rounded-2xl px-4 h-14">

{

icon&&

<div className="text-slate-500">

{icon}

</div>

}

<input

type={type}

placeholder={placeholder}

value={value}

onChange={onChange}

className="flex-1 ml-3 bg-transparent outline-none"

/>

</div>

</div>

);

}

export default InputField;