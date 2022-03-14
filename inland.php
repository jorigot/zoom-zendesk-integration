<?php
    
    /// obtener el json que manda zoom
    $_bodydata=json_decode((file_get_contents('php://input')),true);
    $fh=fopen("debug.txt","a+");
    fputs($fh,print_r($_bodydata,true));
    fclose($fh);
    
    /// ver si el evento es un llamada contestada
    if ($_bodydata['event']=='phone.callee_answered'){
        if ($_bodydata['payload']['object']['callee']['phone_number']=='+16503429197' || $_bodydata['payload']['object']['callee']['extension_number']=='163'   ){ // verificar que la llamada sea al contestador automatico
            $callid=$_bodydata['payload']['object']['call_id'];
            $caller=$_bodydata['payload']['object']['caller']['phone_number'];
            $callee=$_bodydata['payload']['object']['callee']['phone_number'];
                crear_ticket($caller,$callee);  // como ya se completaron los tres pasos insertar el ticket en zendesk
        }
    }
    
  
    /// ver si el evento es un llamada finalizada

function crear_ticket($caller,$callee){
    $url="https://inlandlogistics.zendesk.com/api/v2/tickets.json";
    
    // caller_name
    // caller_number
    // packageid
    // email
    $data=array(
        "ticket"=>array(
            "comment"=>array(
                    "body"=>"call from ".$caller." at ".date('m-d-Y H:i:s')
                ),
            "priority"=>"normal",
            "custom_fields"=>array("id"=>"4415218538651", "value"=> $caller),
            "subject"=>"call from ".$caller." at ".date('m-d-Y H:i:s'),
            "requester" => array("name" => $caller, "email" => $caller."@inlandlogistics.co" )
            )
        );
        
    $dataJson=json_encode($data);
    curl_post($url,$dataJson);
    
}


function curl_post($theUrl, $theData)
{

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $theUrl);

    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    //return the transfer as a string
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HEADER, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type:application/json'
    ));
    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
    $username="lorena.bran@inlandlogistics.co";
    $password="Inland1";
    curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $theData);

    curl_setopt($ch, CURLOPT_TIMEOUT_MS, 3600000);
    // $output contains the output string
    $fh = fopen("curl_callback.txt", "a+");
    fputs($fh, Date("d/m/Y H:i:s") . " : iniciando callback \n");
    fputs($fh, "url : $theUrl \n");
    fputs($fh, "data: $theData \n");
    $output = curl_exec($ch);
    fputs($fh, Date("d/m/Y H:i:s") . " : " . $output . "\n");
    fputs($fh, Date("d/m/Y H:i:s") . " : Terminado callback \n -------------------------------------------------- \n");

    if (!curl_errno($ch))
    {
        $info = curl_getinfo($ch);
        fputs($fh, "curl info:" . "\n");
        fputs($fh, print_r($info, true) . "\n");
    }
    else
    {
        $error = curl_error($ch);
        fputs($fh, "curl error:" . "\n");
        fputs($fh, print_r($error, true) . "\n");
        $info = curl_getinfo($ch);
        fputs($fh, "curl info:" . "\n");
        fputs($fh, print_r($info, true) . "\n");
    }
    // close curl resource to free up system resources
    curl_close($ch);
    return $output;
}



?>