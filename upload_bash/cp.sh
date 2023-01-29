while getopts u:a:f: flag
do
    case "${flag}" in
        a) domain=${OPTARG};;
        #a) age=${OPTARG};;
        #f) fullname=${OPTARG};;
    esac
done

cp "../$domain" "/etc/nginx/sites-available/$domain"
