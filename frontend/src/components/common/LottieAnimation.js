import Lottie from "lottie-react";

function LottieAnimation({

animation,

className=""

}){

return(

<div className={className}>

<Lottie

animationData={animation}

loop={true}

/>

</div>

);

}

export default LottieAnimation;