with open('2020/input/8.txt') as file:
    content = file.read().strip()

def a():
    lines = content.split('\n')

    accumulator = 0
    visited_lines = []
    i = 0
    while i not in visited_lines:
        visited_lines.append(i)         

        line = lines[i]
        line_pieces = line.split(' ')
        operation = line_pieces[0]
        argument = int(line_pieces[1])

        print('', line, operation, argument, sep='\n')
        
        if operation == 'nop':
            i += 1
        elif operation == 'acc':
            i += 1
            accumulator += argument
        else:
            i += argument



    print(f'accumulator: {accumulator}')

a()


