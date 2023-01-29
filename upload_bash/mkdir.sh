while getopts u:a:f: flag
do
    case "${flag}" in
        a) domain=${OPTARG};;
        #a) age=${OPTARG};;
        #f) fullname=${OPTARG};;
    esac
done

mkdir "/root/domains/$domain"
