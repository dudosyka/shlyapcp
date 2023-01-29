while getopts u:a:f: flag
do
    case "${flag}" in
        a) domain=${OPTARG};;
        #a) age=${OPTARG};;
        #f) fullname=${OPTARG};;
    esac
done

echo "<h1>Fuck damn Hestia!</h1>" > "/root/domains/$domain/index.html"

