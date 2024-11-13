with open('2020/input/2.txt') as file:
    content = file.read()

def a():
    valid_password_count = 0
    lines = content.split('\n')[:-1]
    
    for line in lines:
        left = line.split(':')[0]
        right = line.split(':')[1]
        password = right.strip()
        
        num_range = left.split(' ')[0]
        char = left.split(' ')[1]

        num_range = num_range.split('-')
        min_count = int(num_range[0])
        max_count = int(num_range[1])

        times_char_in_password = 0
        for i in range(len(password)):
            if password[i] == char:
                times_char_in_password += 1
        if times_char_in_password <= max_count and times_char_in_password >= min_count:
            valid_password_count += 1

    print(f'Valid password count: {valid_password_count}')

def b():
    valid_password_count = 0

    lines = content.split('\n')[:-1]
    for line in lines:
        left = line.split(':')[0]
        right = line.split(':')[1]
        password = right.strip()
        
        num_range = left.split(' ')[0]
        char = left.split(' ')[1]

        num_range = num_range.split('-')
        min_count = int(num_range[0]) - 1
        max_count = int(num_range[1]) - 1

        one_found = False
        if min_count >= 0 and min_count < len(password) and password[min_count] == char:
            one_found = True
        if max_count >= 0 and max_count < len(password) and password[max_count] == char:
            one_found = not one_found

        if one_found:
            valid_password_count += 1
        else:
            print(min_count, max_count, char, password)

    print(f'Valid password count: {valid_password_count}')

b()
