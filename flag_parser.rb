require 'json'

# Just copy+paste lines from https://emojipedia.org/flags/ into input_flags.txt
# Slight manual input change for Texas

as_hash = {}
File.readlines('input_flags.txt').each do |line|
    #puts line
    split_line = line.split('Flag:')
    flag_emoji = split_line[0].strip
    location_name = split_line[1].strip

    as_hash[flag_emoji] = location_name
end

puts as_hash.to_json