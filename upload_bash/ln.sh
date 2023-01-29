while getopts u:a:f: flag
do
    case "${flag}" in
        a) domain=${OPTARG};;
        #a) age=${OPTARG};;
        #f) fullname=${OPTARG};;
    esac
done

ln -s "/etc/nginx/sites-available/$domain" "/etc/nginx/sites-enabled"
